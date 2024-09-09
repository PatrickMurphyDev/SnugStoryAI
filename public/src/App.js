import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateCharacter from "./pages/CreateCharacter/CreateCharacter";
import ViewCharacters from "./pages/CreateCharacter/ViewCharacters";
import IslandEditor from "./pages/IslandEditor";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/IslandEditor" element={<IslandEditor />} />
        <Route path="/createCharacter" element={<CreateCharacter />} />
        <Route path="/viewCharacters" element={<ViewCharacters />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
