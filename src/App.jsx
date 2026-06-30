import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Works } from './components/Works.jsx';
import { Strengths } from './components/Strengths.jsx';
import { Contact } from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <Strengths />
        <Contact />
      </main>
    </>
  );
}
