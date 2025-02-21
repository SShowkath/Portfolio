import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import NavBar from './Components/NavBar/NavBar';
import MobileNav from './Components/MobileNav/MobileNav';
import './App.scss';

const LoadingScreen = () => {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 3.25,
      ease: [0.4, 0, 0.2, 1], 
      onComplete: () => {
        progress.set(100);
      }
    });

    return () => controls.stop();
  }, []);

  return (
    <div className="LoadingScreen">
      <motion.img 
        src="./pokemon.gif" 
        alt="Loading Pokemon"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="Progress">
        <motion.div 
          className="ProgressBar"
          style={{ 
            width,
            background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      className="AppContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isDesktop ? <NavBar /> : <MobileNav />}
        </motion.div>
      )}
    </motion.div>
  );
};

export default App;