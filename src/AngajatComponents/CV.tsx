import React from "react";
import ResponsiveAppBar from "./AppBarAngajat";
import { Box, Container, TextField, Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../components/AuthProvider";
import ShowCV from "./ShowCV";
import { cvExists } from "../../convex/cv";
import Footnote from "../components/FootNote";
import { createTheme } from "@mui/material/styles";

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
      <div style={{ position: "sticky", top: 0, zIndex: 9999 }}>
        <ResponsiveAppBar />
      </div>{" "}
      {cvExists && <ShowCV />}
      {!cvExists && (
        <div>
          <div style={{ margin: "75px" }}>
            <h1>Create your CV</h1>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="First Name"
                name="firstName"
                variant="standard"
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF" } }}
              />
              <br />
              <TextField
                style={{ marginTop: "20px" }}
                id="outlined-basic"
                label="Last Name"
                variant="standard"
                name="lastName"
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF" } }}
              />
              <br />
              <TextField
                id="phone"
                label="Phone"
                variant="standard"
                name="phone"
                style={{ marginTop: "20px" }}
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF" } }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="standard"
                name="email"
                style={{ marginTop: "20px" }}
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF" } }}
              />

              <br />
              <TextField
                id="outlined-basic"
                label="Adress"
                variant="standard"
                name="adress"
                style={{ marginTop: "20px" }}
                InputLabelProps={{ style: { color: "#FFFFFF" } }}
                InputProps={{ style: { color: "#FFFFFF" } }}
              />
              <br />
              <div style={{ maxWidth: "400px", marginTop: "20px" }}>
                <TextField
                  id="outlined-basic"
                  label="About me"
                  variant="standard"
                  name="aboutMe"
                  multiline
                  minRows={1}
                  maxRows={1}
                  fullWidth
                  inputProps={{ style: { width: "100%" } }}
                  InputLabelProps={{ style: { color: "#FFFFFF" } }}
                  InputProps={{ style: { color: "#FFFFFF" } }}
                />
              </div>
              <Button
                style={{ color: "#5C8374" }}
                size="lg"
                type="submit"
                variant="soft"
                sx={{ mt: 3, mb: 2 }}
              >
                Create CV
              </Button>
            </Box>
          </div>
        </div>
      )}
      <div className="blue">
        <Footnote />
      </div>{" "}
    </div>
  );
}

export default CV;
