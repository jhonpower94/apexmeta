import { Alert, Box, Snackbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "react-qr-code";

import { BootstrapButton } from "../components/styledcomponents";
import "../transactions/style.scoped.css";
import { CurrencyFormat } from "../currencyformatter";
import { RedditTextField } from "../styles";

export default function RecieveDialog({ open, handleClose, values }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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

  const switchCoinNetwork = (key) => {
    switch (key) {
      case "BITCOIN":
        return "BITCOIN";
      case "ETHERUEM":
        return "ERC20";
      case "BNB SMART":
        return "BEP20";
      case "TRON":
        return "TRC20";
      case "USDT":
        return "ERC20";
      default:
        return "ERC20";
    }
  };

  const address =
    values.coin === "USDT"
      ? "0x9FdB12879c4CfeF5D1bA27ae8598dDc9f85AeEDD"
      : "bc1ql5chheye7fue4dq6uqknvavupy285zjnuj58x5";

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="modal-content modal-content-demo" bis_skin_checked={1}>
          <div className="modal-header" bis_skin_checked={1}>
            <h6 className="modal-title">
              Send <CurrencyFormat amount={values.amount} />
            </h6>
            <button
              aria-label="Close"
              className="close"
              onClick={handleClose}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body" bis_skin_checked={1}>
            <p />
            <center>
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 200,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={address}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <br />
              &nbsp;&nbsp;
              <RedditTextField
                disabled
                fullWidth
                label="Wallet Address"
                value={address}
              />
              <Box mt={1} />
              <CopyToClipboard text={address} onCopy={handleClick}>
                <BootstrapButton
                  // onClick={handleClick}
                  variant="contained"
                  disableRipple
                >
                  Copy
                </BootstrapButton>
              </CopyToClipboard>
            </center>
            <br /> <p />
            <p className="response" />
            <p />
            <ul className="list-group wd-md-100p">
              <li className="list-group-item d-flex align-items-center">
                <div bis_skin_checked={1}>
                  <h6 className="tx-13 tx-inverse tx-semibold mg-b-0">
                    Network
                  </h6>
                  <span className="d-block tx-11 text-muted">
                    {switchCoinNetwork(values.coin)}
                  </span>
                </div>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <div bis_skin_checked={1}>
                  <h6 className="tx-13 tx-inverse tx-semibold mg-b-0">
                    Expected arrival
                  </h6>
                  <span className="d-block tx-11 text-muted">
                    1 network confirmation
                  </span>
                </div>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <div bis_skin_checked={1}>
                  <h6 className="tx-13 tx-inverse tx-semibold mg-b-0">
                    Expected unlock
                  </h6>
                  <span className="d-block tx-11 text-muted">
                    2 network confirmations
                  </span>
                </div>
              </li>
            </ul>
            <p />
          </div>
          <div className="modal-footer" bis_skin_checked={1}>
            {/* <button className="btn ripple btn-primary" type="button">Save changes</button> */}
            <button
              className="btn ripple btn-secondary"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
          variant="standard"
        >
          {"Address copied!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
