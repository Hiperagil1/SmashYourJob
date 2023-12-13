import React, { useEffect } from "react";
import ResponsiveAppBar from "../AngajatComponents/AppBarAngajat";
import { Direction, Fade, Slide } from "@mui/material";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../components/AuthProvider";
import Footnote from "../components/FootNote";

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function jobs() {
  const [isVisible, setIsVisible] = useState(true);
  const { username } = useAuth();

  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "up" | "down" | undefined
  >("left");

  //const allCV = useQuery(api.cv.allCV, {});
  const notSeen = useQuery(api.jobsSeen.notSeen, { userName: username });
  const addUserSeen = useMutation(api.jobsSeen.addJobSeen);
  const addPreMatch = useMutation(api.preMatch.addPreMatch);

  const handleJobReturn = () => {
    if (Array.isArray(notSeen) && notSeen.length > 0) {
      let jobIndex = getRandomNumber(0, notSeen.length - 1);
      return notSeen[jobIndex] || "";
    }
    return "";
  };

  const [job, setJob] = useState(handleJobReturn() as string);

  //actualizeaza starea {job} cand se schimba allCV
  useEffect(() => {
    setJob(handleJobReturn());
  }, [notSeen]);

  const handleSmash = async () => {
    setIsVisible(false);
    setSlideDirection("left");
    setTimeout(() => {
      setIsVisible(true);
      setSlideDirection(undefined);
    }, 500);

    addUserSeen({ employee: username, jobSeen: job });
    addPreMatch({ currentUser: username, matchedUser: job });
    setJob(handleJobReturn() as string);
  };

  const handlePass = async () => {
    setIsVisible(false);
    setSlideDirection("right");
    setTimeout(() => {
      setIsVisible(true);
      setSlideDirection(undefined);
    }, 500);

    addUserSeen({ employee: username, jobSeen: job });
    setJob(handleJobReturn() as string);
  };
  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 9999 }}>
        <ResponsiveAppBar />
      </div>
      <div
        style={{
          marginTop: "250px",
          paddingBottom: "250px",
          paddingTop: "100px",
        }}
      >
        <Slide direction={slideDirection} in={isVisible}>
          <p style={{ textAlign: "center" }}>{job}</p>
        </Slide>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              style={{ color: "#5C8374" }}
              size="lg"
              variant="soft"
              onClick={handlePass}
            >
              Pass
            </Button>
            <Button
              style={{ color: "#5C8374" }}
              size="lg"
              variant="soft"
              onClick={handleSmash}
            >
              Smash
            </Button>
          </Box>
        </div>
      </div>
      <div className="blue">
        <Footnote />
      </div>
    </div>
  );
}

export default jobs;
