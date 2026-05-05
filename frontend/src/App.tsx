import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CollegeDetailPage from "./pages/CollegeDetailPage";
import ComparePage from "./pages/ComparePage";
import HomePage from "./pages/HomePage";
import PredictorPage from "./pages/PredictorPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/colleges/:slug" element={<CollegeDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/predictor" element={<PredictorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
