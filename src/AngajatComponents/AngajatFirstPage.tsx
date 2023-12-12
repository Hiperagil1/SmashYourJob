import React from "react";
import ResponsiveAppBar from "./AppBarAngajat";
import { useAuth } from "../components/AuthProvider";
import { Button } from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import Footnote from "../components/FootNote";

function AngajatFirstPage() {
  const { username } = useAuth();
  const navigate = useNavigate();

  const cvExists = useQuery(api.cv.cvExists, { userName: username });
  return (
    <div>
      <ResponsiveAppBar />
      {!cvExists && (
        <Button
          onClick={() => {
            navigate("/cv");
          }}
        >
          Create CV
        </Button>
      )}

      <Footnote />
    </div>
  );
}

export default AngajatFirstPage;
