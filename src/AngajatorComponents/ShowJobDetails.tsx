import React from "react";
import { useAuth } from "../components/AuthProvider";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function ShowJobDetails() {
  const { username } = useAuth();
  const jobExists = useQuery(api.jobDetails.jobExists, { userName: username });
  const getJobs = useQuery(api.jobDetails.getJobDetails, {
    userName: username,
  });

  if (jobExists && getJobs && getJobs.length > 0) {
    const jobName = getJobs[0].jobName;
    const salary = getJobs[0].salary;

    return (
      <div>
        <h2>{jobName}</h2>
        <p>Salary: {salary}</p>
      </div>
    );
  } else {
    console.log("No JOB data available.");
    return null;
  }
}

export default ShowJobDetails;
