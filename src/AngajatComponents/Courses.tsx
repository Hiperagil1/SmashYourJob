import React from "react";
import ResponsiveAppBar from "./AppBarAngajat";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "../components/AuthProvider";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { v } from "convex/values";
import "./CSSAngajat/Courses.css";

function Courses() {
  const { username } = useAuth();

  const addPreMatch = useMutation(api.preMatch.addPreMatch);
  const allPreMatch = useQuery(api.preMatch.allPreMatch, {});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user1 = data.get("user1") as string;
    const user2 = data.get("user2") as string;

    console.log(
      await addPreMatch({
        currentUser: user1,
        matchedUser: user2,
      })
    );
    console.log(await allPreMatch);
  };

  const curs1 =
    "https://www.ateliereleilbah.ro/wp-content/uploads/2021/08/curs-bucatar-calificare-scoala-bucatari-curs-gatit-cooking-bucuresti-cluj-ploiesti.jpg";
  const curs2 =
    "https://www.ateliereleilbah.ro/wp-content/uploads/2021/08/Curs-Programare-IT-App-Web-Development-FullStack-FrontEnd-BackEnd-Developer-Atelierele-ILBAH-1.jpg";
  const curs3 =
    "https://www.ateliereleilbah.ro/wp-content/uploads/2022/04/Curs-Barman-1.jpg";
  const curs4 =
    "https://www.ateliereleilbah.ro/wp-content/uploads/2021/08/Curs-GoogleAds-si-Analytics-Atelierele-ILBAH.jpg";

  return (
    <div>
      <ResponsiveAppBar />
      <center>
        <div className="courses-container">
          <div className="column">
            <a href="https://www.ateliereleilbah.ro/cursuri/curs-bucatar-scoala-bucatari/">
              <img className="tabel" src={curs1} alt="Curs 1" />
            </a>
            <a href="https://www.ateliereleilbah.ro/cursuri/curs-programare-it-full-stack-developer-front-end-back-end/">
              <img className="tabel" src={curs2} alt="Curs 2" />
            </a>
          </div>
          <div className="column">
            <a href="https://www.ateliereleilbah.ro/cursuri/curs-barman/">
              <img className="tabel" src={curs3} alt="Curs 3" />
            </a>
            <a href="https://www.ateliereleilbah.ro/cursuri/curs-google-ads-si-google-analytics/">
              <img className="tabel" src={curs4} alt="Curs 4" />
            </a>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Courses;
