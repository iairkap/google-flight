import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "@/pages/Home";
import { useFlightStore } from "@/store/flightStore";

function App() {
  const { detectUserLocation } = useFlightStore();

  useEffect(() => {
    // Detect user location when app loads
    detectUserLocation();
  }, [detectUserLocation]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;