import React, { useState } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import "./Popup.css";
import { useQuery } from "convex/react";
import { useAuth } from "../components/AuthProvider";
import { api } from "../../convex/_generated/api";
import { Button } from "@mui/material";

export default function InteractiveTable() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [userSelected, setUserSelected] = useState("");

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

  const handleRowClick = (name: string) => {
    setUserSelected(name);
    setSelectedRow(name);
    setPopupContent(name); // Setează conținutul ferestrei pop-up cu numele din rândul selectat
    setShowPopup(true); // Arată fereastra pop-up când se face clic pe un rând
  };

  const closePopup = () => {
    setShowPopup(false); // Ascunde fereastra pop-up când se face clic în afara ei
  };

  return (
    <div>
      <Sheet variant="outlined">
        <Table variant="soft" borderAxis="bothBetween">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Username</th>
            </tr>
          </thead>
          <tbody>
            {matchedProfiles.map((row) => (
              <tr
                key={row}
                onClick={() => handleRowClick(row)}
                style={{
                  backgroundColor:
                    selectedRow === row ? "lightblue" : "inherit",
                  cursor: "pointer",
                }}
              >
                <th scope="row">{row}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h2>User: {userSelected}</h2>
            <p>Acesta este conținutul ferestrei pop-up.</p>
            <Button onClick={closePopup}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
