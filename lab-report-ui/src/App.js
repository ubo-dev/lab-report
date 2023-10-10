import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportList from "./components/ReportList";
import Navbar from "./components/Navbar";
import AddReport from "./components/AddReport";
import UpdateReport from "./components/UpdateReport";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<ReportList />}></Route>
          <Route path="/" element={<ReportList />}></Route>
          <Route path="/report/all" element={<ReportList />}></Route>
          <Route path="/report/add" element={<AddReport />}></Route>
          <Route path="/report/update/:id" element={<UpdateReport />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
