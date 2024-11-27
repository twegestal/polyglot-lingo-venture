import { useEffect } from 'react';
import { useHealth } from './hooks/useHealth';

export const App = () => {
  const { health, getHealth } = useHealth();

  useEffect(() => {
    getHealth();
  }, [health, getHealth]);

  return <p>{health}</p>;
};
