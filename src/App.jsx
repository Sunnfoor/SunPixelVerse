import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Works } from './components/Works.jsx';
import { Strengths } from './components/Strengths.jsx';
import { Contact } from './components/Contact.jsx';
import { MouseTrail } from './components/MouseTrail.jsx';
import { CatLoader } from './components/CatLoader.jsx';
import { ImmersiveJourney } from './components/ImmersiveJourney';
import { works } from './data/portfolio.js';

export default function App() {
  const [interactiveMode, setInteractiveMode] = useState(true);
  const [showImmersive, setShowImmersive] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('site-interactive', interactiveMode);
    return () => document.body.classList.remove('site-interactive');
  }, [interactiveMode]);

  const enterPortfolio = () => {
    setShowImmersive(false);
    window.setTimeout(() => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <>
      <CatLoader />
      {showImmersive ? (
        <ImmersiveJourney
          works={works}
          interactiveMode={interactiveMode}
          onEnterPortfolio={enterPortfolio}
        />
      ) : (
        <>
          <Navbar
            interactiveMode={interactiveMode}
            onToggleInteractiveMode={() => setInteractiveMode((current) => !current)}
          />
          <main>
            <Hero interactiveMode={interactiveMode} />
            <About />
            <Works interactiveMode={interactiveMode} />
            <Strengths />
            <Contact interactiveMode={interactiveMode} />
          </main>
        </>
      )}
      <MouseTrail enabled={interactiveMode} />
    </>
  );
}
