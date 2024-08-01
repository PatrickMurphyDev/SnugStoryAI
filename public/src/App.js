import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/createCharacter" element={<CreateCharacter />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
