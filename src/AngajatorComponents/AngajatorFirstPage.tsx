import React from "react";
import ResponsiveAppBar from "./AppBarAngajator";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "@mui/joy/Button";
import Footnote from "../components/FootNote";

function AngajatFirstPage() {
  const { username } = useAuth();
  const navigate = useNavigate();

  const jobExists = useQuery(api.jobDetails.jobExists, { userName: username });

  return (
    <div>
      <div style={{ position: "sticky", top: 0, zIndex: 9999 }}>
        <ResponsiveAppBar />
      </div>
      {!jobExists && (
        <center style={{ paddingTop: "320px", paddingBottom: "320px" }}>
          <Button
            size="lg"
            variant="soft"
            style={{
              color: "#5C8374",
            }}
            onClick={() => {
              navigate("/details");
            }}
          >
            Create a Job offer
          </Button>
        </center>
      )}
      {jobExists && (
        <div>
          <section>
            <h1>Welcome to JobMatcher!</h1>
            <p>
              Quickly connect to career opportunities or outstanding talents in
              an engaging and interactive way.
            </p>
          </section>

          <section className="blue">
            <h2>"Smash" or "Pass" for a perfect match</h2>
            <p>
              Employers and job seekers use the "smash" and "pass" functionality
              to swiftly assess compatibility.
            </p>
          </section>

          <section>
            <h3>
              SmashYourJob is where opportunities and talents meet, transforming
              the recruitment process into an interactive and enjoyable
              experience for all participants. Join today and start uncovering
              endless possibilities for your professional future!
            </h3>
          </section>
        </div>
      )}
      <div className="blue">
        <Footnote />
      </div>
    </div>
  );
}

export default AngajatFirstPage;
