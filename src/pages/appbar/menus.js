import { Lock } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { navigate } from "@reach/router";
import { deleteDoc, doc } from "firebase/firestore";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, signOut } from "../../config/firebaseinit";
import { useStyles } from "../styles";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Menus() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.useInfos);
  const allNotifications = useSelector((state) => state.notification);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorElsettngs, setAnchorElsettings] = React.useState(null);
  const openSettings = Boolean(anchorElsettngs);

  const [anchorEluser, setAnchorEluser] = React.useState(null);
  const openUser = Boolean(anchorEluser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickSettings = (event) => {
    setAnchorElsettings(event.currentTarget);
  };

  const clearNotfcation = async (uid) => {
    await deleteDoc(doc(db, "users", `${userinfo.id}`, "notification", uid));
    //dispatch(clearnotification$());
  };

  const handleClickUser = (event) => {
    setAnchorEluser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElsettings(null);
    setAnchorEluser(null);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        navigate("/account/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <IconButton
          size="medium"
          aria-label="notifications"
          aria-controls={open ? "notificationsettings" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="inherit"
          className={classes.stackicon}
        >
          <Badge badgeContent={allNotifications.length} color="error">
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <IconButton
          size="medium"
          aria-label="settings"
          aria-controls={openSettings ? "settingsmenu" : undefined}
          aria-expanded={openSettings ? "true" : undefined}
          onClick={handleClickSettings}
          color="inherit"
          className={classes.stackicon}
        >
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton
          size="medium"
          edge="end"
          aria-label="user"
          aria-controls={openUser ? "usermenu" : undefined}
          aria-expanded={openUser ? "true" : undefined}
          onClick={handleClickUser}
          aria-haspopup="true"
          color="inherit"
          className={classes.stackicon}
        >
          <AccountCircle />
        </IconButton>
      </Stack>

      <StyledMenu
        // settings menu
        id="settingsmenu"
        MenuListProps={{
          "aria-labelledby": "settings",
        }}
        anchorEl={anchorElsettngs}
        open={openSettings}
        onClose={handleClose}
      >
        {[
          {
            ttle: "password",
            page: "settings/password",
            icon: <Lock />,
          },
          {
            ttle: "Transaction Pin",
            page: "resetpin",
            icon: <VisibilityOutlinedIcon />,
          },
        ].map((menuitem, index) => (
          <MenuItem
            onClick={() => {
              handleClose();

              navigate(`../../dashboard/${menuitem.page}`);
            }}
            disableRipple
            key={index}
          >
            {menuitem.icon}
            {`Reset ${menuitem.ttle}`}
          </MenuItem>
        ))}
      </StyledMenu>

      <StyledMenu
        // user menu
        id="usersmenu"
        MenuListProps={{
          "aria-labelledby": "user",
        }}
        anchorEl={anchorEluser}
        open={openUser}
        onClose={handleClose}
      >
        <Typography p={1}>
          {`${userinfo.firstName} ${userinfo.lastName}`}
        </Typography>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
          disableRipple
        >
          <LogoutOutlinedIcon />
          {"Sign out"}
        </MenuItem>
      </StyledMenu>

      <StyledMenu
        // Notification
        id="notificationsettings"
        MenuListProps={{
          "aria-labelledby": "notifications",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <List>
          {allNotifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => clearNotfcation(notification.uid)}>
                  <DeleteForeverOutlinedIcon fontSize="large" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </StyledMenu>
    </div>
  );
}
