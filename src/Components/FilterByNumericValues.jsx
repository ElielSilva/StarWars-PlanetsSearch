import React from 'react';
import PropTypes from 'prop-types';

function FilterByNumericValues(
  { values: { column, comparison, value },
    addFilterToList, listNameFilter, chengeFilterNumber },
) {
  // console.log(props);
  return (
    <>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ (e) => chengeFilterNumber(e.target) }
      >
        {listNameFilter && listNameFilter
          .map((name) => (<option value={ name } key={ name }>{name}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
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
        value={ value }
        onChange={ (e) => chengeFilterNumber(e.target) }
      />
      <button
        type="button"
        data-testid="button-filter"
        disabled={ !listNameFilter }
        onClick={ () => addFilterToList() }
      >
        Filter
      </button>
    </>
  );
}

FilterByNumericValues.propTypes = {
  values: PropTypes.shape({
    column: PropTypes.string.isRequired,
    comparison: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  addFilterToList: PropTypes.func.isRequired,
  listNameFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  chengeFilterNumber: PropTypes.func.isRequired,
};

export default FilterByNumericValues;
