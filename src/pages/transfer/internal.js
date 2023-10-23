import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import NumberFormat from "react-number-format";

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

export default function Internal({
  values,
  handleChange,
  submitForm,
  loading,
}) {
  return (
    <form onSubmit={submitForm}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="outlined-basic"
            label="Account Number"
            name="accountnumber"
            constiant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="outlined-basic-pin"
            label="Transaction Pin"
            name="pin"
            constiant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            id="outlined-multiline-static"
            label="Transfer description"
            multiline
            rows={2}
            defaultValue=""
            fullWidth
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
            {`Continue`}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
