import React from "react";
import ResponsiveAppBar from "./AppBarAngajator";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@mui/material";

function AngajatFirstPage() {
  const { username } = useAuth();
  const navigate = useNavigate();

  const jobExists = useQuery(api.jobDetails.jobExists, { userName: username });

  return (
    <div>
      <ResponsiveAppBar />
      {!jobExists && (
        <Button
          onClick={() => {
            navigate("/details");
          }}
        >
          Create a Job offer
        </Button>
      )}
    </div>
  );
}

export default AngajatFirstPage;
