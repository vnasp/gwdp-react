import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";

function AppRoutes() {
  return (
    <div className="container">
    <Header />
    <Routes>
      <Route path="/" element={<Step1 />} />
      <Route path="/correo-enviado" element={<Step2 />} />
      <Route path="/recibe-tokens" element={<Step3 />} />
    </Routes>
    </div>
  );
}

export default AppRoutes;
