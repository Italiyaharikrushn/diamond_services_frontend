import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Stones from "./pages/Stones";
import Settings from "./pages/Settings";
import CompleteRing from "./pages/CompleteRing";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/stones" element={<Stones />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/complete-ring" element={<CompleteRing />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
