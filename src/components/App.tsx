// Importurile necesare
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import FirstPage from "./FirstPage";
import SignUp from "./SignUp"; // Importă pagina SignUp

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signup" element={<SignUp />} />{" "}
          {/* Adaugă ruta pentru SignUp */}
          {/* Alte rute sau componente pot fi adăugate aici */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
