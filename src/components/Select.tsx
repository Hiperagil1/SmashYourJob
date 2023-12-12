import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [accountType, setAccountType] = React.useState("Employee"); // Modificarea numelui stării

  const handleChange = (event: SelectChangeEvent) => {
    setAccountType(event.target.value as string); // Modificarea numelui funcției și a stării
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Account type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Account type"
          value={accountType} // Modificarea valorii folosite pentru select
          onChange={handleChange}
        >
          <MenuItem value="Employee">Employee</MenuItem>{" "}
          {/* Modificarea valorilor din MenuItem */}
          <MenuItem value="Employer">Employer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
