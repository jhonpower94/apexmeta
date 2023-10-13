import { useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import logo from "../images/logo.png";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    padding: theme.spacing(2.5),
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={classes.avatar}>
      <img
        src={logo}
        height={
          useMediaQuery(useTheme().breakpoints.up("sm")) ? "60px" : "60px"
        }
        alt="Enrichement FCU"
      />
    </div>
  );
}

export default Logo;
