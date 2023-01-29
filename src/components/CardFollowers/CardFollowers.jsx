import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import user from "../../assets/user.svg";
import location from "../../assets/lokasi.svg";
import site from "../../assets/site.svg";
import github from "../../assets/github.svg";
import Pagination from "../../components/Pagination/Pagination";
import PaginationFalse from "../../components/Pagination/PaginationFalse";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CardFollowers = ({ response }) => {
  const { avatar_url, login, id } = response;
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <div className="content">
          <Card className="cardContent" sx={{ width: 250 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt="Remy Sharp"
                  src={avatar_url}
                />
              }
              title={login}
              subheader={<small>{id}</small>}
            />
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CardFollowers;
