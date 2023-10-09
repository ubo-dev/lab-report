import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportList from "./components/ReportList";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<ReportList />}></Route>
          <Route path="/" element={<ReportList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
