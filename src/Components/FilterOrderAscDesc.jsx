import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const Input = styled.input`
//   display: block;
//   margin-left: 50%;
//   height: 42px;
//   width: 211px;
//   border-radius: 10px;
// `;

function FilterOrderAscDesc({ chengeFilterAscDesc }) {
  const [localFilter, setLocalFilter] = useState({
    order: { column: 'population', sort: 'ASC' },
  });

  const ChangeLocalFilter = ({ name, value }) => {
    setLocalFilter({
      order: { ...localFilter.order, [name]: value },
    });
  };

  return (
    <form>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ (event) => ChangeLocalFilter(event.target) }
      >
        <option selected value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="sort">
        <input
          type="radio"
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          onClick={ (event) => ChangeLocalFilter(event.target) }
        />
        Ascendente
      </label>
      <label htmlFor="sort">
        <input
          type="radio"
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ (event) => ChangeLocalFilter(event.target) }
        />
        Descendente
      </label>
      <button
        type="button"
        name="ordenar"
        data-testid="column-sort-button"
        onClick={ () => chengeFilterAscDesc(localFilter) }
      >
        Ordenar
      </button>
    </form>
  );
}

FilterOrderAscDesc.propTypes = {
  chengeFilterAscDesc: PropTypes.func.isRequired,
};

export default FilterOrderAscDesc;
