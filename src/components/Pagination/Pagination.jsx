import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Paging = ({ setPage, numOfPages = 20 }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          variant="outlined"
          shape="rounded"
          count={numOfPages}
          onChange={(e) => handleChange(e.target.textContent)}
          color="secondary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default Paging;
