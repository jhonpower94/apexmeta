import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HistoryIcon from "@mui/icons-material/History";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { globalHistory, navigate } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { loggedIn$ } from "../config/firebaseinit";
import { getUserInfo } from "../config/services";
import AppbarMain, { Drawertop } from "./appbar/appbar";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    loggedIn$.subscribe((user) => {
      if (!user) {
        navigate("account");
      } else {
        // console.log(user);
        getUserInfo(user.uid);
      }
    });
  }, []);

  const handleListItemClick = (event, index, page) => {
    setSelectedIndex(index);
    navigate(page);
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Drawertop />
      <Divider />
      <List>
        {[
          {
            title: "Account",
            link: "/dashboard/account",
            icon: <HomeOutlinedIcon />,
          },
          {
            title: "transfer",
            link: "/dashboard/transfer/savings",
            icon: <TransferWithinAStationIcon />,
          },
          {
            title: "transactions",
            link: "/dashboard/transactions/savings",
            icon: <HistoryIcon />,
          },
          {
            title: "Manage cards",
            link: "/dashboard/cards/savngs",
            icon: <CreditCardOutlinedIcon />,
          },
        ].map((menu, index) => (
          <ListItemButton
            // selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index, menu.link)}
            key={index}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText
              primary={menu.title}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;



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
      <AppbarMain handleDrawer={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f2f2f2",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f2f2f2",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
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

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
