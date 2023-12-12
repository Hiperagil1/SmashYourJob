import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

import BasicSelect from "./Select";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [accountType, setAccountType] = React.useState("Employee"); // Modificarea numelui stării
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setAccountType(event.target.value as string); // Modificarea numelui funcției și a stării
  };

  const convertAccountType = () => {
    return accountType.toLowerCase() === "employer";
  };

  const userMutation = useMutation(api.users.addUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("firstName") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    if (password === confirmPassword && username !== "") {
      try {
        // Dacă parolele coincid, poți face apelul către baza de date pentru a salva datele
        const result = await userMutation({
          username: username,
          password: password,
          accountType: convertAccountType(),
          // Alte date pe care vrei să le salvezi în baza de date
        });
        if (result !== "Utilizatorul există deja.") {
          navigate("/");
        } else console.log({ result });
      } catch (error) {
        console.error("Eroare la salvarea în baza de date:", error);
      }
    } else if (username === "") {
      console.log("Username invalid.");
    } else {
      // Dacă parolele nu coincid, afișează un mesaj în consolă sau altundeva
      console.log("Parola și Confirm Password nu coincid. Te rog să verifici.");
      // Sau poți seta un mesaj în starea componentei pentru a-l afișa în interfața utilizatorului
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="text"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Account type
                    </InputLabel>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
