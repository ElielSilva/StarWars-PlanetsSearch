import React, { useContext, useState } from 'react';
import planetContext from '../Context/PlanetContext';
import Line from './Line';
import LineFixed from './LineFixed';
// import PropTypes from 'prop-types';

function Table() {
  const { data } = useContext(planetContext);
  const [nameFilter, setFilter] = useState(''); // aqui recebe o name especifico de um planeta a ser filtrado
  // const [listNameFilter, setlistNameFilter] = useState([
  //   'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  // ]);
  const [numberFilter, setNumberFilter] = useState({
    column: 'population', operator: 'maior que', number: 0,
  });
  const [listFilter, setListFilter] = useState([]); // aqui será armazenado um lista de filter

  const addFilterToList = () => {
    setListFilter([
      ...listFilter,
      {
        id: listFilter.length ? listFilter[listFilter.length - 1].id + 1 : 0,
        ...numberFilter },
    ]);
    setNumberFilter({ column: 'population', operator: 'maior que', number: 0 });
  };

  const chengeFilterNumber = ({ name, value }) => {
    setNumberFilter({
      ...numberFilter,
      [name]: value,
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
        <option
          value="population"
          selected
          style={ { display: listFilter
            .some(({ column }) => column === 'population') ? 'none' : 'block' } }
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
      <ul>
        {listFilter && listFilter
          .map(({ column, operator, number }, index) => (
            <li key={ index }>{`${column} ${operator} ${number}`}</li>
          ))}
      </ul>
      <table Border={ 2 }>
        <LineFixed />
        {(nameFilter && !listFilter.length) && data
          .filter(({ name }) => (name.includes(nameFilter)))
          .map((planet) => (<Line key={ planet.name } planet={ planet } />))}
        {(!nameFilter && !listFilter.length) && data
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
