import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiamondsPage from "../pages/DiamondsPage";
import Dashbord from "../pages/dashbord";
function ProtectedRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashbord/>} />
                <Route path="/diamondspage" element={<DiamondsPage/>} />
            </Routes>
        </Router>
    );
}

export default ProtectedRoutes;
