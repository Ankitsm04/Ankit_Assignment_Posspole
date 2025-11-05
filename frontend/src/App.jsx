import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/:jobId" element={<JobDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
