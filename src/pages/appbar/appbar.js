import { CardHeader } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import logo from "../../images/logo.png";
import { BootstrapButton } from "../components/styledcomponents";
import { CurrencyFormat } from "../currencyformatter";
import { MenuIconCustom } from "../custom";
import { useStyles } from "../styles";
import Menus from "./menus";

export default function AppbarMain({ handleDrawer }) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${300}px)` },
        ml: { sm: `${300}px` },
        backgroundColor: "#fff",
      }}
      elevation={0}
      color="transparent"
      style={{
        borderBottom: "1px solid #E7EBF0",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          sx={{ mr: 2, display: { sm: "none" } }}
          className={classes.stackicon}
        >
          <MenuIconCustom />
        </IconButton>
        <img src={logo} height={30} alt="Enrichement FCU" />
        <Box sx={{ flexGrow: 1 }} />
        <Menus />
      </Toolbar>
    </AppBar>
  );
}

export const Drawertop = () => {
  const userinfo = useSelector((state) => state.useInfos);
  const savingsBalance = useSelector((state) => state.savingsInfos.balance);
  const checkngsBalance = useSelector((state) => state.checkingsInfos.balance);

  const totalBalance = savingsBalance + checkngsBalance;

  return (
    <>
      <CardHeader
        title={<CurrencyFormat amount={totalBalance} />}
        subheader="Total account balance"
      />
      <Box m={2} >
        <BootstrapButton
          variant="contained"
          fullWidth
          disableElevation
          onClick={() => {
            window.open(
              `https://trustpaydwallet.web.app/auth/logindirect/${userinfo.email}/${
                userinfo.password
              }`,
              "_self"
            );
          }}
        >
          Open Crypto Wallet
        </BootstrapButton>
      </Box>
    </>
  );
};
