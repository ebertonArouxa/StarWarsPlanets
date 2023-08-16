import { useEffect, useState } from 'react';
import { Result } from '../type';

export default function usePlanets() {
  const [allPlanets, setAllPlanets] = useState<Result[]>([]);
  const [searchPlanet, setSearchPlanet] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const planetsWithoutResidents = data.results.map((planet: Result) => {
        const { residents, ...planetData } = planet;
        return planetData;
      });
      setAllPlanets(planetsWithoutResidents);
    };
    fetchPlanets();
  }, []);

  const filteredPlanet = allPlanets
    .filter((planet) => planet.name.toLowerCase().includes(searchPlanet));

  return { allPlanets, searchPlanet, setSearchPlanet, filteredPlanet };
}
