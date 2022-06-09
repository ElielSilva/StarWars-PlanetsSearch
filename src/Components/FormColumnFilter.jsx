import React,{useState} from 'react';
// import PropTypes from 'prop-types';

function FormColumnFilter(props) {
  const [listNameFilter, setlistNameFilter] = useState('');
  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        value={ numberFilter.column }
        onChange={ (e) => chengeFilterNumber(e.target) }
      >
        <option
          value="population"
          selected
          // style={ { display: listFilter
          //   .some(({ column }) => column === 'population') ? 'none' : 'block' } }
        >
          population
        </option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="operator"
        value={ numberFilter.operator }
        onChange={ (e) => chengeFilterNumber(e.target) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="number"
        data-testid="value-filter"
        value={ numberFilter.number }
        onChange={ (e) => chengeFilterNumber(e.target) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => addFilterToList() }
      >
        Filter
      </button>
    </>
  );
}

// FormColumnFilter.propTypes = {};

export default FormColumnFilter;
