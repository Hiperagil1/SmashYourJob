import React from "react";
import ResponsiveAppBar from "./AppBarAngajat";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../components/AuthProvider";
import ShowCV from "./ShowCV";
import { cvExists } from "../../convex/cv";

function CV() {
  const { username } = useAuth();

  const userMutation = useMutation(api.cv.addCV);

  const cvExists = useQuery(api.cv.cvExists, { userName: username });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const phone = data.get("phone") as string;
    const email = data.get("email") as string;
    const address = data.get("adress") as string;
    const aboutMe = data.get("aboutMe") as string;

    const result = await userMutation({
      userName: username,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      address: address,
      aboutMe: aboutMe,
    });
    console.log({ result });
  };

  return (
    <div>
      <ResponsiveAppBar />

      {cvExists && <ShowCV />}
      {!cvExists && (
        <div>
          <div style={{ marginTop: "20px" }}>
            <h1>Create your CV</h1>
            <h2>Contact</h2>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="First Name"
                name="firstName"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                name="lastName"
              />
              <br />
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                name="phone"
                style={{ marginTop: "20px" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                style={{ marginTop: "20px" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Adress"
                variant="outlined"
                name="adress"
                style={{ marginTop: "20px" }}
              />
              <br />
              <div style={{ maxWidth: "400px", marginTop: "20px" }}>
                <TextField
                  id="outlined-basic"
                  label="About me"
                  variant="outlined"
                  name="aboutMe"
                  multiline
                  minRows={3}
                  maxRows={6}
                  fullWidth
                  inputProps={{ style: { width: "100%" } }}
                />
              </div>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create CV
              </Button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export default CV;
