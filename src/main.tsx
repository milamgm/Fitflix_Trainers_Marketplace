import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./application/App";

import AppProvider from "./application/context/AppContext";
import ChatProvider from "./application/context/ChatContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/fitflix-trainers-marketplace/">
      <AppProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
