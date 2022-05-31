import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import MemoryPage from "./pages/MemoryPage";

function App() {
  React.useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/memory" element={<MemoryPage />} />
    </Routes>
  );
}

export default App;
