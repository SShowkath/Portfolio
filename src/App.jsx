import React from 'react';
import './App.scss';
import Hero from './components/Hero/Hero';
import Experience from './components/Experience/Experience';
import Particles from './components/Particles/Particles.jsx';

const App = () => {
  return (
    <div className="App">
      <Particles 
        particleCount={550}
        particleSpread={15}
        speed={0.04}
        particleColors={['#8fa3b8', '#9ba3b4', '#bfc5d1']}
        alphaParticles={false}
        particleBaseSize={120}
        sizeRandomness={0.8}
        cameraDistance={18}
        disableRotation={false}
        moveParticlesOnHover={false}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
        className="background-particles"
      />
      <div className="content">
        <Hero />
        <Experience />
      </div>
    </div>
  );
};

export default App;