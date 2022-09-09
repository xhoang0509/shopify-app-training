import { Card, Select, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

const options = [
  { label: "Enable", value: "enable" },
  { label: "Disable", value: "disable" },
];

function General() {
  // page state
  const [name, setName] = useState();
  const [priority, setPriority] = useState(0);
  const [selected, setSelected] = useState("today");

  const handleNameChange = useCallback((value) => setName(value), []);
  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const handlePriorityChange = useCallback((newValue) => {
    setPriority(newValue);
  }, []);

  return (
    <Card title="General Information" sectioned>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={handleNameChange}
        required
      />
      <TextField
        label="Priority"
        type="number"
        value={priority}
        onChange={handlePriorityChange}
        helpText="Please enter an integer from 0 to 99.0 is the highest priority."
      />
      <Select
        label="Status"
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
    </Card>
  );
}

export default General;
