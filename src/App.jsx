import { useState, useEffect } from 'react';
import UploadPage from './components/UploadPage.jsx';
import Portfolio from './components/Portfolio.jsx';

function App() {
  const [cvData, setCvData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCvParsed = (data) => {
    setCvData(data);
  };

  const handleReset = () => {
    setCvData(null);
  };

  return (
    <div className="app">
      <Particles />
      {!cvData ? (
        <UploadPage onCvParsed={handleCvParsed} isLoading={isLoading} setIsLoading={setIsLoading} />
      ) : (
        <Portfolio data={cvData} onReset={handleReset} />
      )}
    </div>
  );
}

function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 20,
      size: 1 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#6c63ff' : '#00d4aa'
    }));
    setParticles(items);
  }, []);

  return (
    <div className="particles-bg" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}

export default App;
