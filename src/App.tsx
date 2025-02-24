import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SocialPills from './components/SocialPills';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { ThemeProvider } from './utils/ThemeContext';
import AudioVisualizer from './utils/AudioVisualizer';
import DynamicFavicon from './components/DynamicFavicon';

function App() {
  return (
    <ThemeProvider>
      <DynamicFavicon/>
      <Router>
        <div className="min-h-screen">
          {/* <CustomCursor /> */}
          <Navbar />
          <SocialPills />
          <AudioVisualizer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;