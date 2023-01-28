import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Home.css";
import Pagination from "../../components/Pagination/Pagination";
import DisplayUser from "../../components/DisplayUser/DisplayUser";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fcfcfc",
    },
  },
});

const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(10);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        ` ${process.env.REACT_APP_URL}/search/users?q=${query}`,
        {
          params: {
            page,
            per_page: limit,
          },
        }
      );
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleQuery = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUser();
      setUsers(items);
    } else {
      console.log("Query undifined");
    }
  };

  useEffect(() => {
    const displayUser = async () => {
      if (query) {
        const items = await fetchUser();
        setUsers(items);
      }
    };
    displayUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <div className="search-form">
          <form onSubmit={handleSearch}>
            {/* <input
              value={query}
              onChange={handleQuery}
              type="text"
              placeholder="Search User"
            />
            <button onClick={handleSearch}>
              <SearchIcon />
            </button> */}
            <div style={{ display: "flex", margin: "15px 0" }}>
              <TextField
                style={{ flex: 1 }}
                label="Cari....."
                variant="outlined"
                value={query}
                onChange={handleQuery}
              />
              <Button
                variant="outlined"
                style={{ marginLeft: 10 }}
                type={"submit"}
              >
                <SearchIcon />
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="search-result">
        <div className="container">
          {users ? (
            users.map((user) => {
              return <DisplayUser user={user} key={user.id} />;
            })
          ) : (
            <h2>Data Undifined</h2>
          )}
        </div>
      </div>
      {users.length ? <Pagination setPage={setPage} /> : null}
    </ThemeProvider>
  );
};

export default Home;
