export interface PlanetApiReturn {
  count: number,
  next: string,
  previous: any,
  results: Result[],
}

export interface Result {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
}
