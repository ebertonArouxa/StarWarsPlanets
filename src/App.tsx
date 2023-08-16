import './App.css';
import TablePlanets from './components/tablePlanets/indexs';
import usePlanets from './hooks/usePlanets';

function App() {
  const {
    allPlanets,
    searchPlanet,
    setSearchPlanet,
    filteredPlanet,
    formResult,
    setFormResult,
    formFilter,
    setAllPlanets,
  } = usePlanets();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlanet(event.target.value);
  };

  const handleSelectChange = (event:
  React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name, value: targetValue } = event.target;
    setFormResult({ ...formResult, [name]: targetValue });
  };

  const handleClick = () => {
    const filteredPlanets = formFilter(formResult);
    if (filteredPlanets) {
      setAllPlanets(filteredPlanets);
    }
  };

  return (
    <>
      <label htmlFor="searchPlanet">
        <span>Search planet:</span>
      </label>
      <input
        type="text"
        id="searchPlanet"
        onChange={ handleChange }
        value={ searchPlanet }
        placeholder="Planet name"
        data-testid="name-filter"
      />
      <label htmlFor="colum">
        <span>Colum</span>
      </label>
      <select
        name="colum"
        id="colum"
        data-testid="column-filter"
        onChange={ handleSelectChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="operator">
        <span>Operator</span>
      </label>
      <select
        name="comparison"
        id="operator"
        data-testid="comparison-filter"
        onChange={ handleSelectChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="number"
        type="number"
        data-testid="value-filter"
        onChange={ handleSelectChange }
        value={ formResult.number }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter

      </button>
      {
        searchPlanet.length > 0
          ? <TablePlanets planets={ filteredPlanet } />
          : <TablePlanets planets={ allPlanets } />
      }
    </>
  );
}

export default App;
