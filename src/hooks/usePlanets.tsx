import { useEffect, useState } from 'react';
import { Result, FormType } from '../type';

const INITIAL_STATE = {
  colum: 'population',
  comparison: 'maior que',
  number: 0,
};

export default function usePlanets() {
  const [allPlanets, setAllPlanets] = useState<Result[]>([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [formResult, setFormResult] = useState(INITIAL_STATE);

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
  }, [searchPlanet]);

  const filteredPlanet = allPlanets
    .filter((planet) => planet.name.toLowerCase().includes(searchPlanet));

  const formFilter = (form: FormType) => {
    if (form.comparison === 'maior que') {
      const planetFiltered = allPlanets
        .filter((planet: any) => Number(planet[form.colum]) > Number(form.number));
      return planetFiltered;
    }
    if (form.comparison === 'menor que') {
      const planetFiltered = allPlanets
        .filter((planet: any) => Number(planet[form.colum]) < Number(form.number));
      return planetFiltered;
    }
    if (form.comparison === 'igual a') {
      const planetFiltered = allPlanets
        .filter((planet: any) => Number(planet[form.colum]) === Number(form.number));
      return planetFiltered;
    }
  };

  return {
    allPlanets,
    searchPlanet,
    setSearchPlanet,
    filteredPlanet,
    formResult,
    setFormResult,
    formFilter,
    setAllPlanets,
  };
}
