import React from "react";
import { useAuth } from "../components/AuthProvider";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "./CSSAngajat/ShowCV.css";

function ShowCV() {
  const { username } = useAuth();
  const cvExists = useQuery(api.cv.cvExists, { userName: username });
  const getCV = useQuery(api.cv.getCV, { userName: username });

  if (cvExists && getCV && getCV.length > 0) {
    const firstName = getCV[0].firstName as string;
    const lastName = getCV[0].lastName;
    const phone = getCV[0].phone;
    const email = getCV[0].email;
    const address = getCV[0].address;
    const aboutMe = getCV[0].aboutMe;

    return (
      <div className="cv">
        <div style={{}}>
          <h1>Curriculum vitae</h1>
        </div>
        <div>
          <h2>First Name</h2>
          <h3>{firstName}</h3>
        </div>
        <div>
          <h2>Last Name</h2>
          <h3>{lastName}</h3>
        </div>
        <div>
          <h2>Phone</h2>
          <h3>{phone}</h3>
        </div>
        <div>
          <h2>Email</h2>
          <h3>{email}</h3>
        </div>
        <div>
          <h2>Adress</h2>
          <h3>{address}</h3>
        </div>
        <div>
          <h2>About Me</h2>
          <h3>{aboutMe}</h3>
        </div>
      </div>
    );
  } else {
    console.log("No CV data available.");
    return null;
  }
}

export default ShowCV;
