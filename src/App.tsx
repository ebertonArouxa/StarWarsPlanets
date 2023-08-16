import './App.css';
import TablePlanets from './components/tablePlanets/indexs';
import usePlanets from './hooks/usePlanets';

function App() {
  const { allPlanets } = usePlanets();
  return (
    <TablePlanets planets={ allPlanets } />
  );
}

export default App;
