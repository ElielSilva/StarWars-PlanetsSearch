import React from 'react';
import PropTypes from 'prop-types';

function Line({ planet }) {
  const { name,
    rotation_period: RotationPeriod,
    orbital_period: OrbitalPeriod,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water: SurfaceWater,
    population,
    films,
    created,
    edited,
    url } = planet;
  return (
    <tr>
      <td data-testid="planet-name">{name}</td>
      <td>{RotationPeriod}</td>
      <td>{OrbitalPeriod}</td>
      <td>{diameter}</td>
      <td>{climate}</td>
      <td>{gravity}</td>
      <td>{terrain}</td>
      <td>{SurfaceWater}</td>
      <td>{population}</td>
      <td>{films}</td>
      <td>{created}</td>
      <td>{edited}</td>
      <td>{url}</td>
    </tr>
  );
}

Line.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rotation_period: PropTypes.string.isRequired,
    orbital_period: PropTypes.string.isRequired,
    diameter: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    gravity: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    surface_water: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    films: PropTypes.arrayOf.isRequired,
    created: PropTypes.string.isRequired,
    edited: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Line;
