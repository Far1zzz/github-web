import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./Profile.css";
import user from "../../assets/user.svg";
import location from "../../assets/lokasi.svg";
import site from "../../assets/site.svg";
import github from "../../assets/github.svg";
import Pagination from "../../components/Pagination/Pagination";
import PaginationFalse from "../../components/Pagination/PaginationFalse";
import ModalContent from "../../components/Modal/ModalContent";
import { color } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Profile = () => {
  const { login } = useParams();

  const [userInfo, setUserInfo] = useState({});
  const [repo, setRepo] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Promise.all([
          axios.get(`${process.env.REACT_APP_URL}/users/${login}`),
          axios.get(`${process.env.REACT_APP_URL}/users/${login}/repos`, {
            params: {
              page,
              per_page: limit,
            },
          }),
        ]);
        setUserInfo(response[0].data);
        setRepo(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, [page, limit]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <div className="content">
          <div className="back">
            <Button variant="outlined" component={Link} to={`/`}>
              Back
            </Button>
          </div>
          <Card className="cardContent" sx={{ width: 350 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt="Remy Sharp"
                  src={userInfo?.avatar_url}
                />
              }
              title={userInfo?.name}
              subheader={<small>{userInfo?.id}</small>}
              action={
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              }
            />
            <CardContent>
              <Typography variant="body2" className="bioContent">
                " {userInfo?.bio} "
              </Typography>
              <div className="infoContent">
                <Typography>
                  <p style={{ color: "blue" }}>
                    <img src={user} alt="...." /> &nbsp;{" "}
                    <ModalContent>{userInfo?.followers} Followers</ModalContent>{" "}
                    &emsp;{" "}
                    <p>
                      <img src={user} alt="...." /> &nbsp; {userInfo?.following}{" "}
                      Following
                    </p>
                  </p>
                </Typography>
                <Typography>
                  {userInfo?.location && (
                    <p>
                      <img src={location} alt="....." /> &nbsp;{" "}
                      {userInfo?.location}
                    </p>
                  )}
                </Typography>
                <Typography>
                  {userInfo?.blog && (
                    <p>
                      <img src={site} alt="...." /> &nbsp; {userInfo.blog}
                    </p>
                  )}
                </Typography>
                <Typography>
                  <p>
                    {/* eslint-disable-next-line */}
                    <a href={userInfo?.html_url} target={"_blank"}>
                      <img src={github} alt="...." /> &nbsp; view github profile
                    </a>
                  </p>
                </Typography>
              </div>
            </CardContent>

            <CardActions disableSpacing></CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className="repoContent">
                {repo.length ? <h3>Repositories</h3> : null}
                {repo ? (
                  repo.map((repos) => (
                    <>
                      <Typography paragraph key={repos.id}>
                        <hr />
                        <div className="repo">
                          <h3>
                            <a
                              href={repos.html_url}
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              {repos.name}
                            </a>
                          </h3>
                          <p>{repos.description}</p>
                          {repos.language && (
                            <small>written in : {repos.language}</small>
                          )}
                        </div>
                      </Typography>
                    </>
                  ))
                ) : (
                  <h3>Repositories not found</h3>
                )}
                {repo.length ? (
                  <Pagination setPage={setPage} />
                ) : (
                  <>
                    <small>Repo notFound</small>
                    <PaginationFalse setPage={setPage} count={1} />
                  </>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
