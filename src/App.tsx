import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
