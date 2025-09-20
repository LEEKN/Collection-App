import { useEffect } from 'react';
import { iconPaths } from 'atomize';

const IconTest = () => {
  useEffect(() => {
    console.log('--- ATOMIZE ICON TEST ---');
    console.log('Value of iconPaths:', iconPaths);
    if (iconPaths) {
      console.log('Number of icons found:', Object.keys(iconPaths).length);
    }
    console.log('--- END OF TEST ---');
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Atomize Icon Test</h1>
      <p>Check the browser console (F12) for the output of `iconPaths`.</p>
    </div>
  );
};

export default IconTest;
