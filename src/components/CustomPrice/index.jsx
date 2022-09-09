import { Card, RadioButton, Stack, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

function CustomPrice() {
  // page stae
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("disabled");

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    []
  );

  const handleAmountChange = useCallback((newValue) => {
    setAmount(newValue);
  }, []);

  return (
    <Card sectioned title="Custom Prices">
      <Stack vertical>
        <RadioButton
          label="Apply a price to selected products"
          checked={value === "disabled"}
          onChange={handleChange}
        />
        <RadioButton
          label="Decrease a fixed amount of the original prices of selected products"
          checked={value === "optional"}
          onChange={handleChange}
        />
        <RadioButton label="Decrease the original prices of selected products by a percentage (%)" />
      </Stack>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
      />
    </Card>
  );
}

export default CustomPrice;
