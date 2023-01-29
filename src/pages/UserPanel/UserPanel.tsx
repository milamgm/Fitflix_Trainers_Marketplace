import React, { useState } from "react";
import "./UserPanel.scss";
import { Link, Outlet } from "react-router-dom";

const UserPanel = () => {
  const [active, setActive] = useState("Dashboard");

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
        <h2>{active}</h2>
        <Outlet />
      </div>
    </>
  );
};

export default UserPanel;
