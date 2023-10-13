import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { navigate } from "@reach/router";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import * as React from "react";
import { docData } from "rxfire/firestore";
import { db, loggedIn$ } from "../../config/firebaseinit";

const drawerWidth = 240;

function AdminIndex(props) {
  React.useEffect(() => {
    loggedIn$.subscribe((user) => {
      if (!user) {
        navigate("../manager");
      } else {
        const querydoc = doc(db, `users/${user.uid}`);
        getDoc(querydoc).then((data) => {
          console.log(data.data());

          if (data.data().admin) {
            console.log("verified");
          } else {
            navigate("/admin/manager");
          }
        });

        /*
        docData(querydoc).subscribe((userData) => {
          console.log(userData.verified);
          if (userData.verified) {
            console.log("verified");
          } else {
            navigate("../manager");
          }
        });
        */
      }
    });
  }, []);

  return (
    <Box
      sx={{
        display: {
          sm: "block",
          md: "flex",
        },
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Bitmax admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

AdminIndex.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminIndex;
