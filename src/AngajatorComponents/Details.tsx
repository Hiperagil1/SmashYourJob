import React from "react";
import ResponsiveAppBar from "./AppBarAngajator";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../components/AuthProvider";
import { cvExists } from "../../convex/cv";
import { query } from "../../convex/_generated/server";
import ShowJobDetails from "./ShowJobDetails";

function CV() {
  const { username } = useAuth();

  const jobExists = useQuery(api.jobDetails.jobExists, { userName: username });
  const addJobDetails = useMutation(api.jobDetails.addJobDetails);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jobName = data.get("jobName") as string;
    const salary = data.get("salary") as string;

    if (isNaN(Number(salary))) {
      // If the salary is not a number, handle the error (e.g., display a message to the user)
      console.log("Salary must be a number");
      return;
    }

    addJobDetails({ userName: username, jobName: jobName, salary: salary });
  };

  return (
    <div>
      <ResponsiveAppBar />
      {jobExists && <ShowJobDetails />}
      {!jobExists && (
        <div>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Job name"
              name="jobName"
              variant="outlined"
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Salary"
              name="salary"
              variant="outlined"
            />
            <br />

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create a job offer
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
}

export default CV;
