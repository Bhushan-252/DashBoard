import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../lib/hooks";

function OwnCard({ user,handleViewPosts }) {
    const {searchTerm} =  useAppSelector(
    (state) => state.users
  );
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 font-bold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };
  return (
    <Card sx={
        {   height:'100%',
            display:"flex",
            flexDirection:"column"
        }
    }>
      <CardContent>
        <Typography gutterBottom variant="h6" sx={{fontStyle:"Bold"}} component="div" >{highlightText(user.name, searchTerm)}</Typography>
        <Typography  variant="body2" sx={{ color: 'text.primery' }} >Email : {highlightText(user.email, searchTerm)}</Typography>
        <Typography  variant="body2" sx={{ color: 'text.primery' }} >Company : {user.company?.name}</Typography>
        <Typography  variant="body2" sx={{ color: 'text.primery' }} >City : {user.address?.city}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained"
             onClick={() => handleViewPosts(user.id)}
           > View Post</Button>
      </CardActions>
    </Card>
  );
}

export default OwnCard;
