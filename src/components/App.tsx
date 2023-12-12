// Importurile necesare
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import FirstPage from "./FirstPage";
import SignUp from "./SignUp"; // Importă pagina SignUp
import * as AngajatComponents from "../AngajatComponents";
import LogIn from "./LogIn";
import AngajatFirstPage from "../AngajatComponents/AngajatFirstPage";
import Employee from "../AngajatorComponents/Employee";
import Details from "../AngajatorComponents/Details";
import { Courses, Matches } from "../AngajatorComponents";
import AngajatorFirstPage from "../AngajatorComponents/AngajatorFirstPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/angajatHome" element={<AngajatFirstPage />} />
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/jobs" element={<AngajatComponents.Jobs />} />{" "}
          <Route path="/cv" element={<AngajatComponents.CV />} />{" "}
          <Route path="/courses" element={<AngajatComponents.Courses />} />{" "}
          <Route path="/matches" element={<AngajatComponents.Matches />} />{" "}
          <Route path="/login" element={<LogIn />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/details" element={<Details />} />
          <Route path="/angajatorCourses" element={<Courses />} />
          <Route path="/angajatorMatches" element={<Matches />} />
          <Route path="/angajatorHome" element={<AngajatorFirstPage />} />
          {/* Adaugă ruta pentru SignUp */}
          {/* Alte rute sau componente pot fi adăugate aici */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
