import { Card, RadioButton, Stack, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

function CustomPrice() {
  // page stae
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("selected_product");
  const [suffix, setSuffix] = useState("");
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (_checked, newValue) => {
      if (newValue === "percentage") {
        setSuffix("%");
        if (parseInt(amount) < 0 || parseInt(amount) > 99) {
          setError("Please enter an integer from 0 to 100");
        } else {
          setError("");
        }
      } else {
        setSuffix("");
        setError("");
      }
      setValue(newValue);
    },
    [amount]
  );

  const handleAmountChange = useCallback(
    (newValue) => {
      setAmount(newValue);
      if (value === "percentage") {
        if (parseInt(newValue) < 0 || parseInt(newValue) > 99) {
          setError("Please enter an integer from 0 to 100");
        } else {
          setError("");
        }
      }
    },
    [value]
  );

  return (
    <Card sectioned title="Custom Prices">
      <Stack vertical>
        <RadioButton
          label="Apply a price to selected products"
          checked={value === "selected_product"}
          id="selected_product"
          onChange={handleChange}
        />
        <RadioButton
          label="Decrease a fixed amount of the original prices of selected products"
          checked={value === "fixed_amount"}
          id="fixed_amount"
          onChange={handleChange}
        />
        <RadioButton
          label="Decrease the original prices of selected products by a percentage (%)"
          checked={value === "percentage"}
          id="percentage"
          onChange={handleChange}
        />
      </Stack>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
        error={error}
        suffix={suffix}
      />
    </Card>
  );
}

export default CustomPrice;
