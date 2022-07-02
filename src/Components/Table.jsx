import React, { useContext, useState, useEffect } from 'react';
import planetContext from '../Context/PlanetContext';
import FilterOrderAscDesc from './FilterOrderAscDesc';
import Line from './Line';
import LineFixed from './LineFixed';
// import PropTypes from 'prop-types';

function Table() {
  const NUMBER_ONE_NEGATIVE = -1;
  const { data } = useContext(planetContext);
  const [nameFilter, setFilter] = useState(''); // aqui recebe o name especifico de um planeta a ser filtrado
  const [listNameFilter, setlistNameFilter] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [numberFilter, setNumberFilter] = useState({
    column: listNameFilter[0], operator: 'maior que', number: 0,
  });
  const [listFilter, setListFilter] = useState([]); // aqui será armazenado um lista de filter
  const [filterAscDesc, setFilterAscDesc] = useState({
    order: { column: 'name', sort: 'ASC' },
  });

  useEffect(() => {
    setNumberFilter({ column: listNameFilter[0], operator: 'maior que', number: 0 });
  }, [listNameFilter]);
  const addFilterToList = () => {
    setlistNameFilter(listNameFilter
      .filter((name) => name !== numberFilter.column));
    setListFilter([
      ...listFilter,
      {
        id: listFilter.length ? listFilter[listFilter.length - 1].id + 1 : 0,
        ...numberFilter },
    ]);
  };

  const buttonTrash = (name) => {
    setlistNameFilter([
      ...listNameFilter, name,
    ]);
    setListFilter(listFilter.filter((item) => name !== item.column));
  };

  const buttonTrashAll = () => {
    setlistNameFilter([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
    setListFilter([]);
  };

  const chengeFilterNumber = ({ name, value }) => {
    setNumberFilter({
      ...numberFilter,
      [name]: value,
    });
  };

  const chengeFilterAscDesc = (stateAscDesc) => {
    console.log(filterAscDesc);
    setFilterAscDesc({
      ...stateAscDesc,
    });
  };

  return (
    <>
      <input
        type="text"
        name="NameFilter"
        id=""
        placeholder="name filer planet"
        value={ nameFilter }
        onChange={ (e) => setFilter(e.target.value) }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ numberFilter.column }
        onChange={ (e) => chengeFilterNumber(e.target) }
      >
        {listNameFilter && listNameFilter
          .map((name) => (<option value={ name } key={ name }>{name}</option>))}
        {/* <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
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
        disabled={ !listNameFilter.length }
        onClick={ () => addFilterToList() }
      >
        Filter
      </button>
      <FilterOrderAscDesc chengeFilterAscDesc={ chengeFilterAscDesc } />
      <ul>
        {listFilter && listFilter
          .map(({ column, operator, number }, index) => (
            <li key={ index } data-testid="filter">
              <button
                type="button"
                value={ column }
                onClick={ () => buttonTrash(column) }
              >
                {`${column} ${operator} ${number}`}
              </button>
            </li>
          ))}
        <li>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => buttonTrashAll() }
          >
            remove filters
          </button>
        </li>
      </ul>
      <table Border={ 2 }>
        <LineFixed />
        {(nameFilter && !listFilter.length) && data
          .filter(({ name }) => (name.includes(nameFilter)))
          .map((planet) => (<Line key={ planet.name } planet={ planet } />))}
        {/* {(filterAscDesc.order.column === '') && data
          .sort((a, b) => a.name < b.name)
          .map((planet) => (<Line key={ planet.name } planet={ planet } />))} */}
        {(!nameFilter && !listFilter.length) && data
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return NUMBER_ONE_NEGATIVE;
            return 0;
          })
          .sort((a, b) => (a[filterAscDesc.order.column] === 'unknown'
          || b[filterAscDesc.order.column]) === 'unknown' && NUMBER_ONE_NEGATIVE)
          .sort((a, b) => {
            if (filterAscDesc.order.sort === 'ASC') {
              return a[filterAscDesc.order.column] - b[filterAscDesc.order.column];
            } return b[filterAscDesc.order.column] - a[filterAscDesc.order.column];
          })
          .map((planet) => (<Line key={ planet.name } planet={ planet } />))}
        {listFilter.length && listFilter.reduce((acc, curr) => acc.filter((planet) => {
          const { column, operator, number } = curr;
          if (operator === 'maior que') {
            return (planet[column] === 'unknown'
              ? false : parseFloat(planet[column]) > parseFloat(number));
          } if (operator === 'menor que') {
            return (planet[column] === 'unknown'
              ? false : parseFloat(planet[column]) < parseFloat(number));
          }
          return (planet[column] === 'unknown'
            ? false : parseFloat(planet[column]) === parseFloat(number));
        }), [...data]).map((planet) => (<Line key={ planet.name } planet={ planet } />))}
      </table>
    </>
  );
}
// Table.propTypes = {};
export default Table;

// style={ { display: listFilter
//   .some(({ column }) => column === 'population') ? 'none' : 'block' } }
