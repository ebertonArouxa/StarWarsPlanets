import { createContext } from 'react';
import { Result } from '../type';

type ContextProps = {
  planets: Result[],
};

const PlanetContext = createContext({} as ContextProps);

export default PlanetContext;
