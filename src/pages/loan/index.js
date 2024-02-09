import { LoadingButton } from "@mui/lab";
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { sendMessage } from "../../config/services";
import CustomizedSnackbars from "../components/snackbar";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseinit";
import SwipeableViews from "react-swipeable-views";
import LoanTable from "./loantable";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function LoanFoarm() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const time = today.getHours() + ":" + today.getMinutes();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const userinfo = useSelector((state) => state.useInfos);

  const [values, setValues] = React.useState({
    amount: "",
    fullname: `${userinfo.firstName} ${userinfo.lastName}`,
    duration: 1,
    remark: "",
    date: `${mm}/${dd}/${yyyy} ${time}`,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    const DocRef = doc(collection(db, "loan"));
    setDoc(DocRef, {
      amount: values.amount,
      pending: true,
      email: userinfo.email,
      name: values.fullname,
      userid: userinfo.id,
      accountnumber: userinfo.accountnumber,
      duration: values.duration,
      remark: values.remark,
      date: Timestamp.fromDate(new Date()),
    }).then(() => {
      sendMessage(
        `New Loan Request from <br/
        ><br/> Name: ${userinfo.firstName} ${userinfo.lastName}
        <br/>Amount: ${values.amount}
        <br/>Email: ${userinfo.email}
        <br/>Account Number: ${userinfo.accountnumber}`,
        "Loan Request",
        "trustpayd@gmail.com",
        "Admin"
      )
        .then(() => {
          sendMessage(
            `You have successfully made a loan request with the following details below <br/>
          Amount: ${values.amount} <br/><br/>
          Duration: ${values.duration} month <br/><br/>
          you will be notified once your request has been processed and verified, thank you.
          `,
            "Loan Department",
            userinfo.email,
            `${userinfo.firstName} ${userinfo.lastName}`
          )
            .then(() => {
              setLoading(false);
              setOpenSnackbar(true);
            })
            .catch(() => {
              setLoading(false);
              alert("Something went try again later");
            });
        })
        .catch(() => {
          setLoading(false);
          alert("Server cannot be reached");
        });
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs">
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={"Loan Request submitted successfully"}
      />
      <Box mt={2} mb={3}>
        <Typography variant="h6">Request For A Loan</Typography>
      </Box>
      <form onSubmit={submit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              id="fullname"
              label="Fullname"
              defaultValue={values.fullname}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              label="Amount"
              value={values.amount}
              onChange={handleChange}
              name="amount"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              constiant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Duration</InputLabel>
              <Select
                required
                labelId="demo-label"
                id="demo-select"
                name="duration"
                value={values.duration}
                label={"Duration"}
                onChange={handleChange}
              >
                {[1, 2, 3, 6, 12, 24, 36].map((duration, index) => (
                  <MenuItem key={index} value={duration}>
                    {duration} month
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="outlined-multiline-static"
              label="Remark for loan"
              onChange={handleChange}
              multiline
              name="remark"
              rows={2}
              defaultValue=""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  value="allowExtraEmails"
                  color="primary"
                  required
                />
              }
              label="I agree to loan terms and policy"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <LoadingButton
              type="submit"
              loading={loading}
              fullWidth
              variant="contained"
              size="large"
              disableElevation
            >
              {`Submit`}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

const styles = {
  tabs: {
    background: "#fff",
  },
  slide: {
    padding: 15,
    minHeight: 100,
  },
  slide1: {
    backgroundColor: "#FEA900",
  },
  slide2: {
    backgroundColor: "#B3DC4A",
  },
  slide3: {
    backgroundColor: "#6AC0FF",
  },
};

export default function Loan() {
  const [state, setState] = React.useState({ index: 0 });

  const handleChange = (event, value) => {
    console.log(value);
    setState({
      index: value,
    });
  };

  const handleChangeIndex = (index) => {
    setState({
      index: index,
    });
  };

  const { index } = state;

  const tabarrays = ["Request Loan", "Your loans"];

  return (
    <div>
      <Tabs
        variant="fullWidth"
        value={state.index}
        onChange={handleChange}
        style={styles.tabs}
      >
        {tabarrays.map((tab, index) => (
          <Tab label={tab} key={index} />
        ))}
      </Tabs>
      <SwipeableViews
        index={index}
        onChangeIndex={(index) => handleChangeIndex(index)}
      >
        <div style={Object.assign({}, styles.slide)}>
          <LoanFoarm />
        </div>
        <div style={Object.assign({}, styles.slide)}>
          <LoanTable />
        </div>
      </SwipeableViews>
    </div>
  );
}
