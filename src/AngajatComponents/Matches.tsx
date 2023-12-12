import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import ResponsiveAppBar from "./AppBarAngajat";
import { useQuery } from "convex/react";
import { useAuth } from "../components/AuthProvider";
import { api } from "../../convex/_generated/api";
import InteractiveTable from "./MatcheTable";

function Matches() {
  const { username } = useAuth();

  const matches = useQuery(api.preMatch.getMatches, { userName: username });
  let matchedProfiles = [];
  if (matches) {
    for (let i = 0; i < matches?.length; i++) {
      if (matches[i].user1 === username) {
        matchedProfiles.push(matches[i].user2);
      } else if (matches[i].user2 === username) {
        matchedProfiles.push(matches[i].user1);
      }
    }
  }

  return (
    <div>
      <ResponsiveAppBar />
      <InteractiveTable />
    </div>
  );
}

export default Matches;
