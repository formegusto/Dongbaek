import { Route, Routes } from "react-router-dom";
import AuthCheck from "./components/AuthCheck";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import MemoryPage from "./pages/MemoryPage";

function App() {
  return (
    <Routes>
      <Route element={<AuthCheck />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<AuthCheck />}>
        <Route path="/memory" element={<MemoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
