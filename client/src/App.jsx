import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/apps/Profile";
import Authguard from "./components/Authguard";
import Layout from "./components/apps/Layout";
import Dashboard from "./components/apps/Dashboard";
import NoteBook from "./components/apps/NoteBook";
import { ToastContainer } from "react-toastify";
import Content from "./components/apps/Content";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Authguard />}>
          <Route element={<Layout />}>
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/notebook" element={<NoteBook />} />
            <Route path="/app/notebook/:id" element={<Content />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
