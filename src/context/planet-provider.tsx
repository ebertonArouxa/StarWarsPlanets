import PlanetContext from './planet-context';
import usePlanets from '../hooks/usePlanets';

type PlanetProviderProps = {
  children: React.ReactNode
};

export default function PlanetProvider({ children }: PlanetProviderProps) {
  const { allPlanets } = usePlanets();

  return (
    <PlanetContext.Provider value={ { planets: allPlanets } }>
      {children}
    </PlanetContext.Provider>
  );
}
