import './App.css';
import TablePlanets from './components/tablePlanets/indexs';
import usePlanets from './hooks/usePlanets';

function App() {
  const { allPlanets, searchPlanet, setSearchPlanet, filteredPlanet } = usePlanets();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlanet(event.target.value);
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
      {
        searchPlanet.length > 0
          ? <TablePlanets planets={ filteredPlanet } />
          : <TablePlanets planets={ allPlanets } />
      }
    </>
  );
}

export default App;
