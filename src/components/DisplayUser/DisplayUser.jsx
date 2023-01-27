import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./style.css";
import { Link } from "react-router-dom";

const Search = ({ user }) => {
  const { avatar_url, login } = user;
  return (
    <>
      <Card className="wrapper">
        <CardMedia image={avatar_url} title="....." className="img-content" />
        <CardContent className="cardContent">
          <Typography gutterBottom variant="h6" component="div">
            {login}
          </Typography>
        </CardContent>
        <Link
          to={`/profile/${login}`}
          id="profile"
          className="btnProfile"
          size="small"
        >
          view profile
        </Link>
      </Card>
    </>
  );
};

export default Search;
