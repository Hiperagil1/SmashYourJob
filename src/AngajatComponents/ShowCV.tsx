import React from "react";
import { useAuth } from "../components/AuthProvider";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

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
      <div>
        <h2>{firstName}</h2>
        <p>Last Name: {lastName}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
        <p>About Me: {aboutMe}</p>
      </div>
    );
  } else {
    console.log("No CV data available.");
    return null;
  }
}

export default ShowCV;
