import React, { useEffect } from "react";
import ResponsiveAppBar from "../AngajatorComponents/AppBarAngajator";
import { Direction, Fade, Slide } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../components/AuthProvider";

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
  const notSeen = useQuery(api.usersSeen.notSeen, { userName: username });
  const addUserSeen = useMutation(api.usersSeen.addUserSeen);
  const addPreMatch = useMutation(api.preMatch.addPreMatch);

  const handleEmployeeReturn = () => {
    if (Array.isArray(notSeen) && notSeen.length > 0) {
      let jobIndex = getRandomNumber(0, notSeen.length - 1);
      return notSeen[jobIndex] || "";
    }
    return "";
  };

  const [job, setJob] = useState(handleEmployeeReturn() as string);

  //actualizeaza starea {job} cand se schimba allCV
  useEffect(() => {
    setJob(handleEmployeeReturn());
  }, [notSeen]);

  const handleSmash = async () => {
    setIsVisible(false);
    setSlideDirection("left");
    setTimeout(() => {
      setIsVisible(true);
      setSlideDirection(undefined);
    }, 500);

    addUserSeen({ mainUser: username, seenUser: job });
    addPreMatch({ currentUser: username, matchedUser: job });
    setJob(handleEmployeeReturn() as string);
  };

  const handlePass = async () => {
    setIsVisible(false);
    setSlideDirection("right");
    setTimeout(() => {
      setIsVisible(true);
      setSlideDirection(undefined);
    }, 500);

    addUserSeen({ mainUser: username, seenUser: job });
    setJob(handleEmployeeReturn() as string);
  };
  return (
    <div>
      <ResponsiveAppBar />

      <div style={{ marginTop: "250px" }}>
        <Slide direction={slideDirection} in={isVisible}>
          <p style={{ textAlign: "center" }}>{job}</p>
        </Slide>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handlePass}>Pass</Button>
          <Button onClick={handleSmash}>Smash</Button>
        </div>
      </div>
    </div>
  );
}

export default jobs;
