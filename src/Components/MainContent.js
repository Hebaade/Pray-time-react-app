import { Divider } from "@mui/material";
import React, { useState } from "react";
import CardPrayer from "./Card_Prayer";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import moment from "moment/moment";
export default function MainContent() {
  const [city, setCity] = useState("Aswan");
  const [time, setTime] = useState({});
  const [currentHour, setCurrentHour] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [counter, setCounter] = useState(0);
  const Time = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=EG`
    );
    setTime(data.data.data.timings);
  };
  useEffect(() => {
    Time();
  }, [city]);
  useEffect(() => {
    let interval = setInterval(() => {
      setUpCountTimer();
    }, 1000);
    const t = moment();
    setCurrentHour(t.format("hh:mm | Do MMM YYYY"));
    return () => clearInterval(interval);
  }, [time]);
  const setUpCountTimer = () => {
    const momentNow = moment();
    let nextPray = "";
    if (
      momentNow.isAfter(moment(time["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Dhuhr"], "hh:mm"))
    ) {
      nextPray = "Dhuhr";
    } else if (
      momentNow.isAfter(moment(time["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Asr"], "hh:mm"))
    ) {
      nextPray = "Asr";
    } else if (
      momentNow.isAfter(moment(time["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Maghrib"], "hh:mm"))
    ) {
      nextPray = "Maghrib";
    } else if (
      momentNow.isAfter(moment(time["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(time["Isha"], "hh:mm"))
    ) {
      nextPray = "Isha";
    } else {
      nextPray = "Fajr";
    }
    setNextPrayer(nextPray);
    const y = time[nextPray];
    let remain = moment(y, "hh:mm:ss").diff(momentNow);
    if (remain < 0) {
      const midNight = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrTomMidNight = moment(y, "hh:mm:ss").diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiff = midNight + fajrTomMidNight;
      remain = totalDiff;
    }
    const durationTime = moment.duration(remain);
    setCounter([
      durationTime.hours(),
      " : ",
      durationTime.minutes(),
      " : ",
      durationTime.seconds(),
    ]);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  return (
    <div style={{ margin: "5px auto" }}>
      <div className="sec1">
        <div>
          <div style={{ margin: "3px !important" }}>
            <h2>{currentHour}</h2>
            <h1>{city}</h1>
          </div>
        </div>
        <div>
          <div>
            <h2>Time to {nextPrayer} prayer</h2>
            <h1>{counter}</h1>
          </div>
        </div>
      </div>
      <Divider
        style={{
          borderColor: "white",
          opacity: "0.1",
          margin: "10px 10px 20px",
        }}
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl style={{ width: "20%", marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
            {city}
          </InputLabel>
          <Select
            style={{ color: "white" }}
            className="select"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label={city}
            onChange={handleCityChange}>
            <MenuItem value={"Cairo"}>Cairo</MenuItem>
            <MenuItem value={"Aswan"}>Aswan</MenuItem>
            <MenuItem value={"Asyut"}>Asyut</MenuItem>
            <MenuItem value={"Ismailia"}>Ismailia</MenuItem>
            <MenuItem value={"Damietta"}>Damietta</MenuItem>
            <MenuItem value={"Dahab"}>Dahab</MenuItem>
            <MenuItem value={"Alexandria"}>Alexandria</MenuItem>
            <MenuItem value={"Benha"}>Benha</MenuItem>
            <MenuItem value={"Giza"}>Giza</MenuItem>
            <MenuItem value={"Tanta"}>Tanta</MenuItem>
            <MenuItem value={"Luxor"}>Luxor</MenuItem>
            <MenuItem value={"Al Fayoum"}>Al Fayoum</MenuItem>
            <MenuItem value={"Al Minya"}>Al Minya </MenuItem>
            <MenuItem value={"Qena"}>Qena </MenuItem>
            <MenuItem value={"Edfu"}>Edfu </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="cards">
        <CardPrayer
          title="Fajr"
          time={time.Fajr}
          img={require("../Assets/fajr-prayer.png")}
        />
        <CardPrayer
          title="Dhur"
          time={time.Dhuhr}
          img={require("../Assets/dhhr-prayer-mosque.png")}
        />
        <CardPrayer
          title="Asr"
          time={time.Asr}
          img={require("../Assets/asr-prayer-mosque.png")}
        />
        <CardPrayer
          title="Maghrib"
          time={time.Sunset}
          img={require("../Assets/sunset-prayer-mosque.png")}
        />
        <CardPrayer
          title="Isha"
          time={time.Isha}
          img={require("../Assets/night-prayer-mosque.png")}
        />
      </div>
    </div>
  );
}
