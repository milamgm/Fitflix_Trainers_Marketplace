import React, { useState } from "react";
import "./UserPanel.scss";
import { Link, Outlet } from "react-router-dom";

const UserPanel = () => {
  const [active, setActive] = useState("Dashboard");
  console.log(active)
  return (
    <>
      <nav>
        <Link
          className={`menu_btn ${active === "Dashboard" ? "active_btn" : "" }`}
          to="dashboard"
          onClick={() => setActive("Dashboard")}
        >
          Dashboard
        </Link>
        <Link
         className={`menu_btn ${active === "Nachrichten" ? "active_btn" : "" }`}
          to="nachrichten"
          onClick={() => setActive("Nachtrichten")}
        >
          Nachrichten
        </Link>
        <Link
         className={`menu_btn ${active === "Meine Konto" ? "active_btn" : "" }`}
          to="meinekonto"
          onClick={() => setActive("Meine Konto")}
        >
          Meine Konto
        </Link>
      </nav>
      <div className="page_body">
        <h1>{active}</h1>
        <Outlet />
      </div>
    </>
  );
};

export default UserPanel;
