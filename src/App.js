import React from 'react';
import ProviderContext from './Context/ProviderContext';
import './App.css';
import Table from './Components/Table';

function App() {
  // const { setData } = useContext(planetContext);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  //     const listPlanet = await response.json();
  //     console.log(listPlanet);
  //     setData(listPlanet.results);
  //   }
  //   fetchData();
  // }, [setData]);
  return (
    <ProviderContext>
      <span>Hello, App Eliel!</span>
      <Table />
    </ProviderContext>
  );
}

export default App;
