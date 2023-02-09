import React, { useEffect, useState } from "react";
import "./UserPanel.scss";
import { Link, Outlet } from "react-router-dom";

const UserPanel = () => {
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    const getCurrentURL = () => {
      return window.location.href;
    };
    const url = getCurrentURL().split("/");
    const page =
      url[url.length - 1].charAt(0).toUpperCase() +
      url[url.length - 1].slice(1);
    setActive(page);
  }, []);

  return (
    <>
      <nav>
        <Link
          className={`menu_btn ${active === "Dashboard" ? "active_btn" : ""}`}
          to="dashboard"
          onClick={() => setActive("Dashboard")}
        >
          Dashboard
        </Link>
        <Link
          className={`menu_btn ${active === "Nachrichten" ? "active_btn" : ""}`}
          to="nachrichten"
          onClick={() => setActive("Nachrichten")}
        >
          Nachrichten
        </Link>
        <Link
          className={`menu_btn ${active === "Konto" ? "active_btn" : ""}`}
          to="konto"
          onClick={() => setActive("Konto")}
        >
          Konto
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
