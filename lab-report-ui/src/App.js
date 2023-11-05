import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportList from "./components/report/ReportList";
import Navbar from "./components/shared/Navbar";
import AddReport from "./components/report/AddReport";
import UpdateReport from "./components/report/UpdateReport";
import ViewReport from "./components/report/ViewReport";
import LaborantList from "./components/laborant/LaborantList";
import ViewLaborant from "./components/laborant/ViewLaborant";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import AddLaborant from "./components/laborant/AddLaborant";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<SignInPage />}></Route>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/report/all" element={<ReportList />}></Route>
          <Route path="/report/add" element={<AddReport />}></Route>
          <Route path="/report/add/:id" element={<AddReport />}></Route>
          <Route path="/report/update/:id" element={<UpdateReport />}></Route>
          <Route path="/report/view/:id" element={<ViewReport />}></Route>
          <Route path="/laborant/all" element={<LaborantList />}></Route>
          <Route path="/laborant/add" element={<AddLaborant />}></Route>
          <Route path="/laborant/view/:id" element={<ViewLaborant />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
