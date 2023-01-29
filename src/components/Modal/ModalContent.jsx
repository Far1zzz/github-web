import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardFollowers from "../CardFollowers/CardFollowers";
import Pagination from "../../components/Pagination/Pagination";
import PaginationFalse from "../../components/Pagination/PaginationFalse";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  color: "white",
  border: "2px solid #fff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 5,
};

const ModalContent = ({ children }) => {
  const { login } = useParams();
  const [open, setOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);

  const fetchFollower = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/users/${login}/followers`,
        {
          params: {
            page,
            per_page: limit,
          },
        }
      );
      console.log(data);
      setFollowers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFollower();
  }, [page, limit]);

  console.log({ data: followers });

  return (
    <div>
      <div
        style={{ cursor: "pointer" }}
        color="inherit"
        className="media"
        onClick={() => {
          handleOpen();
        }}
      >
        {children}
      </div>{" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Follower
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              {followers ? (
                followers.map((response) => {
                  return (
                    <CardFollowers response={response} key={response.id} />
                  );
                })
              ) : (
                <h5>Followers notFound</h5>
              )}
              {followers.length ? (
                <Pagination setPage={setPage} />
              ) : (
                <>
                  <small>No Followers</small>
                  <PaginationFalse setPage={setPage} count={1} />
                </>
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalContent;
