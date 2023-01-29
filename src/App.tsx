import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./styles/App.scss";
import "./styles/Effects.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAppContext } from "./context/AppContext";
import CreateAd from "./pages/CreateAd";
import Home from "./pages/Home";
import Search from "./pages/Search/Search";
import Trainer from "./pages/Trainer";
import UserPanel from "./pages/UserPanel";
import { Toaster } from "react-hot-toast";
import Messages from "./pages/UserPanel/SubPages/Messages";
import MyAccount from "./pages/UserPanel/SubPages/MyAccount";
import Dashboard from "./pages/UserPanel/SubPages/Dashboard";

interface IProtectedRouteProps {
  children: JSX.Element;
}

function App() {
  const { user } = useAppContext();

  const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route
          path="/benutzerpanel"
          element={
            <ProtectedRoute>
              <UserPanel />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="nachrichten" element={<Messages />} />
          <Route path="meinekonto" element={<MyAccount />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
        <Route path="/anzeigeaufgeben" element={<CreateAd />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
