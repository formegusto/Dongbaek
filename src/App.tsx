import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import MemoryPage from "./pages/MemoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/memory" element={<MemoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
