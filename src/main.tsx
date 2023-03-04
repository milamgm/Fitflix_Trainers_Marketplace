import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import App from "./application/App";
import AppProvider from "./application/context/AppContext";
import ChatProvider from "./application/context/ChatContext/ChatContext";
<<<<<<< HEAD
import { i18next } from "./common/utilities/utils"
=======
import i18next from "i18next";
import global_de from "./common/translations/de/global.json"

i18next.init({
  interpolation: {
    escapeValue: false
  }, lng: "de", resources: {
    de: {
      global: global_de
    }
  }
})

>>>>>>> 3f34bce1f24253eda9af763b0dcd17d939ca2956

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter basename="/fitflix-trainers-marketplace/">
        <AppProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </AppProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
