import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import github from "../../assets/github.svg";
import location from "../../assets/lokasi.svg";
import site from "../../assets/site.svg";
import user from "../../assets/user.svg";
import "./Profile.css";

const Profile = () => {
  const { login } = useParams();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/users/${login}`
        );
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Button className="back" variant="outlined" component={Link} to={`/`}>
        Back
      </Button>
      <div className="container">
        <div className="userInformation">
          <div className="image">
            <img src={userInfo?.avatar_url} alt="...." />
          </div>
          <div className="userContent">
            <h1>{userInfo?.name}</h1>
            <p>{userInfo?.id}</p>
            <p>{userInfo?.bio}</p>
            <div className="moreData">
              <p>
                <img src={user} alt="...." />
                {userInfo?.followers} Followers &emsp;{" "}
                <img src={user} alt="...." /> {userInfo?.following} Following
              </p>

              {userInfo?.location && (
                <p>
                  <img src={location} alt="....." />
                  {userInfo?.location}
                </p>
              )}

              {userInfo?.blog && (
                <p>
                  <img src={site} alt="...." /> {userInfo.blog}
                </p>
              )}

              <p>
                <img src={github} alt="...." />
                {/* eslint-disable-next-line */}
                <a href={userInfo?.html_url} target={"_blank"}>
                  view github profile
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
