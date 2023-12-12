import { FC, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import { useAppSelector } from "../../../../state/Store";
import { number, object, string } from "yup";

const TradeBookingContainer = styled("div")`
  height: 100%;
  width: 100%;
  padding: 16px;
`;

type TradeBookingForm = {
  portfolio: string;
  security: string;
  side: string;
  amount: number;
  price: number;
  account: string;
};

const tradeBookingInitialValues: TradeBookingForm = {
  portfolio: "",
  security: "",
  side: "",
  amount: 0,
  price: 0,
  account: "",
};

export const BuySide = "Buy";
export const SellSide = "Sell";
export type TradeSide = typeof BuySide | typeof SellSide;

const tradeBookingSchema = object().shape({
  portfolio: string().required(),
  security: string().required(),
  side: string().required(),
  amount: number().required(),
  price: number().required(),
  account: string().required(),
});

const TradeBooking: FC = () => {
  const { security, portfolio, price, side } = useAppSelector(
    (state) => state.tradeBooking
  );
  const [initialValues, setInitialValues] = useState<TradeBookingForm>(
    tradeBookingInitialValues
  );

  useEffect(() => {
    setInitialValues((prevState) => ({
      ...prevState,
      security: security ?? "",
      portfolio: portfolio ?? "",
      price: price ?? 0,
      side: side ?? "",
    }));
  }, [security, portfolio, price, side]);

  function handleReset() {
    setInitialValues(tradeBookingInitialValues);
  }

  function handleSubmit() {
    handleReset();
  }

  return (
    <TradeBookingContainer>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={tradeBookingSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            values: { portfolio, security, side, amount, account, price },
            isValid,
            dirty,
            handleSubmit,
            handleBlur,
            handleChange,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={{ sm: 1, md: 2 }}
              >
                <TextField
                  fullWidth
                  label="Security"
                  variant="standard"
                  name={"security"}
                  value={security}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  fullWidth
                  label="Portfolio"
                  variant="standard"
                  name={"portfolio"}
                  value={portfolio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl fullWidth variant="standard">
                  <InputLabel id="side-label">Side</InputLabel>
                  <Select
                    labelId="side-label"
                    value={side}
                    label="Side"
                    name={"side"}
                    onChange={handleChange}
                  >
                    <MenuItem value={BuySide}>{BuySide}</MenuItem>
                    <MenuItem value={SellSide}>{SellSide}</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Amount"
                  variant="standard"
                  name={"amount"}
                  value={amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  fullWidth
                  label="Price"
                  variant="standard"
                  name={"price"}
                  value={price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  fullWidth
                  label="Account"
                  variant="standard"
                  name={"account"}
                  value={account}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box display="flex" alignItems="flex-end" pt={{ xs: 1, md: 0 }}>
                  <Link
                    href={`ddebbg:<new-tab>NTN ${portfolio}<go>ID ${security}<go>${side} ${amount} ${price} ${account}<go>`}
                    underline="none"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Button
                      className="submit-button"
                      variant="contained"
                      disabled={!(isValid && dirty)}
                    >
                      Submit
                    </Button>
                  </Link>
                </Box>
                <Box display="flex" alignItems="flex-end" pt={{ xs: 1, md: 0 }}>
                  <Button
                    variant="contained"
                    color="error"
                    type="reset"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </TradeBookingContainer>
  );
};
export default TradeBooking;
