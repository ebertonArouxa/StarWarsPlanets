import { useEffect, useState } from 'react';
import { Result, FormType } from '../type';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const INITIAL_STATE = {
  column: columns[0],
  comparison: 'maior que',
  number: 0,
};

export default function usePlanets() {
  const [allPlanets, setAllPlanets] = useState<Result[]>([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [formResult, setFormResult] = useState(INITIAL_STATE);
  const [optionColumns, setOptionColumns] = useState<string[]>(columns);

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
        .filter((planet: any) => Number(planet[form.column]) > Number(form.number));
      return planetFiltered;
    }
    if (form.comparison === 'menor que') {
      const planetFiltered = allPlanets
        .filter((planet: any) => Number(planet[form.column]) < Number(form.number));
      return planetFiltered;
    }
    if (form.comparison === 'igual a') {
      const planetFiltered = allPlanets
        .filter((planet: any) => Number(planet[form.column]) === Number(form.number));
      return planetFiltered;
    }
  };

  useEffect(() => {
    setFormResult({
      column: optionColumns[0],
      comparison: 'maior que',
      number: 0,
    });
  }, [optionColumns]);

  return {
    allPlanets,
    searchPlanet,
    setSearchPlanet,
    filteredPlanet,
    formResult,
    setFormResult,
    formFilter,
    setAllPlanets,
    optionColumns,
    setOptionColumns,
  };
}
