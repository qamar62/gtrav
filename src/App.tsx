import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';
import './styles/main.css';

const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const ThingsToDo = lazy(() => import('./pages/ThingsToDo'));
const Contact = lazy(() => import('./pages/Contact'));
const TourDetail = lazy(() => import('./pages/TourDetail'));

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: '4rem', width: '100%' }}>
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem' }}>
              <div>Loading...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route path="/things-to-do" element={<ThingsToDo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<div style={{ textAlign: 'center', padding: '5rem 0', fontSize: '1.5rem', color: '#e91e63' }}>404 Not Found</div>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
