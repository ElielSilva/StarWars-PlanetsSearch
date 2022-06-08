import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetContext from './PlanetContext';

function ProviderContext({ children }) {
  const [data, setData] = useState([]);
  const context = {
    data,
    setData,
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const listPlanet = await response.json();
      // console.log(listPlanet);
      setData(listPlanet.results);
    }
    fetchData();
  }, [setData]);

  return (
    <planetContext.Provider value={ context }>
      {children}
    </planetContext.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProviderContext;
