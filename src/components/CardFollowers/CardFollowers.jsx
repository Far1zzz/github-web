import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

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
