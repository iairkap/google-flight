import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from "@/pages/Home";
import { useFlightStore } from "@/store/flightStore";
import Loader from "@/components/Loader";
import GoogleTopBar from "@/components/GoogleTopBar";

function App() {
  const { detectUserLocation, isInitializing } = useFlightStore();

  useEffect(() => {
    detectUserLocation();
  }, [detectUserLocation]);

  if (isInitializing) {
    return (
      <Loader
        fullScreen={true}
      />
    );
  }

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <GoogleTopBar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;