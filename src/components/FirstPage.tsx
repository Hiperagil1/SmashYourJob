import React from "react";
import LogIn from "./LogIn";
import AngajatFirstPage from "./AngajatFirstPage";
import { useAuth } from "./AuthProvider";

function FirstPage() {
  const { isLoggedIn } = useAuth();
  const { logout } = useAuth();

  return (
    <div>
      {!isLoggedIn && <LogIn />}
      {isLoggedIn && <AngajatFirstPage />}
    </div>
  );
}

export default FirstPage;
