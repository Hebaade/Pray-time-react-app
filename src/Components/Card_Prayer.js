import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'

export default function CardPrayer({title,time,img}) {
  return (
    <div>
      <Card className='card'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={ img }
            alt="img"
          />
          <CardContent style={{padding:"30px"}}>
            <h2 gutterBottom variant="h5" component="div" >
            {title}
            </h2>
            <h1 variant="h2" color="text.secondary">
             {time}
            </h1>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
