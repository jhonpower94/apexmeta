import { ArrowForwardIos } from "@mui/icons-material";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { navigate } from "@reach/router";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import CustomizedSnackbars from "../components/snackbar";
import { BootstrapButton, StyledCard } from "../components/styledcomponents";
import CreditCard from "../creditcard";
import { CurrencyFormat } from "../currencyformatter";
import { useStyles } from "../styles";
import TransactioLight from "../transactions/transactionlight";
import { ProfileHeader } from "./profile";

function AccountIndex() {
  const classes = useStyles();
  const savingsinfo = useSelector((state) => state.savingsInfos);
  const checkingsinfo = useSelector((state) => state.checkingsInfos);
  const transactions = useSelector((state) => state.totalTransactionsType);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={"Account Number copied"}
      />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ProfileHeader />
            </Grid>
            <Grid item xs={12} md={12}>
              <a
                onClick={() => {
                  navigate("cards/savngs");
                }}
              >
                <CreditCard type={"Savings"} data={savingsinfo} />
              </a>
            </Grid>
            <Grid
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              item
              xs={12}
              md={12}
            >
              <Toolbar>
                <Typography variant="body1">Recent transactions</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIos />}
                  onClick={() => navigate("/dashboard/transactions/savings")}
                >
                  See all
                </Button>
              </Toolbar>
              <TransactioLight />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {[
              {
                title: "Savings balance",
                account_number: `Account Number: ${savingsinfo.accountnumber}`,
                balance: savingsinfo.balance,
                page: "savings",
                actions: (
                  <>
                    <CopyToClipboard
                      text={savingsinfo.accountnumber}
                      onCopy={handleClick}
                    >
                      <BootstrapButton
                        fullWidth
                        variant="contained"
                        disableElevation
                      >
                        Copy account
                      </BootstrapButton>
                    </CopyToClipboard>
                    <BootstrapButton
                      fullWidth
                      variant="contained"
                      disableElevation
                      onClick={() => navigate(`/dashboard/transfer/savings`)}
                    >
                      Transfer
                    </BootstrapButton>
                  </>
                ),
              },
              {
                title: "Overdraft",
                account_number: "",
                balance: checkingsinfo.balance,
                page: "checkings",
                actions: (
                  <BootstrapButton
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={() => navigate(`/dashboard/transfer/checkings`)}
                  >
                    Transfer
                  </BootstrapButton>
                ),
              },
            ].map((accnt, index) => (
              <Grid item xs={12} md={12} key={index}>
                <StyledCard variant="outlined">
                  <CardHeader
                    title={accnt.title}
                    subheader={accnt.account_number}
                    titleTypographyProps={{ variant: "h5" }}
                    subheaderTypographyProps={{ variant: "h6" }}
                  />
                  <CardContent>
                    <Typography variant="h4">
                      <CurrencyFormat amount={accnt.balance} />
                    </Typography>
                  </CardContent>
                  <CardActions>{accnt.actions}</CardActions>
                </StyledCard>
              </Grid>
            ))}
            <Grid
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
              item
              xs={12}
              md={12}
            >
              <Toolbar>
                <Typography variant="body1">Recent transactions</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIos />}
                  onClick={() => navigate("/dashboard/transactions/savings")}
                >
                  See all
                </Button>
              </Toolbar>
              <TransactioLight />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountIndex;

/*
 <Profile />
 <CardActions>
                    <Stack direction="row" spacing={2}>
                      {[
                        {
                          title: "copy",
                          variant: "contained",
                          icon: <CreditCardOutlinedIcon />,
                          action: () => {
                            navigate(`/dashboard/cards/${accnt.page}`);
                          },
                        },
                        {
                          title: "History",
                          variant: "outlined",
                          icon: <HistoryOutlinedIcon />,
                          action: () => {
                            navigate(`/dashboard/transactions/${accnt.page}`);
                          },
                        },
                        {
                          title: "transfer",
                          variant: "contained",
                          icon: <SendOutlinedIcon />,
                          action: () => {
                            navigate(`/dashboard/transfer/${accnt.page}`);
                          },
                        },
                      ].map((action, index) => (
                        <IconButton
                          size="medium"
                          aria-label={action.title}
                          color="inherit"
                          className={classes.stackicon}
                          key={index}
                          onClick={action.action}
                        >
                          {action.icon}
                        </IconButton>
                      ))}
                    </Stack>
                  </CardActions>
                  */
