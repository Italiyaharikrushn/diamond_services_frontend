import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Stones from "./pages/Stones";
import Settings from "./pages/Settings";
import CompleteRing from "./pages/CompleteRing";
import DiamondDetails from "./components/DiamondDetails";
import RingDetails from "./components/RingDetails";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/stones" element={<Stones />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:id" element={<RingDetails />} />
            <Route path="/complete-ring" element={<CompleteRing />} />

            <Route path="/diamond/:id" element={<DiamondDetails />} />
            <Route path="/gemstone/:id" element={<DiamondDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
