import React from "react";
import LogIn from "./LogIn";
import AngajatorFirstPage from "../AngajatorComponents/AngajatorFirstPage";
import AngajatFirstPage from "../AngajatComponents/AngajatFirstPage";
import { useAuth } from "./AuthProvider";

function FirstPage() {
  const { isLoggedIn, accountType } = useAuth();
  const { logout } = useAuth();

  return (
    <div>
      {!isLoggedIn && <LogIn />}
      {isLoggedIn && accountType && <AngajatorFirstPage />}
      {isLoggedIn && !accountType && <AngajatFirstPage />}
    </div>
  );
}

export default FirstPage;
