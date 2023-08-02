import React from "react";
import Nav from "../components/Nav";
import UserProfile from "../components/UserProfile";
import Footer from "../components/Footer";

function User() {
  return (
    <div>
      <Nav />
      <div className="user__container">
        <UserProfile />
        <Footer />
      </div>
    </div>
  );
}

export default User;
