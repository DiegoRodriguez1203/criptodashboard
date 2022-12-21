import React from 'react';
import './Header.css'; // importacion de estilos css
import { useTheme } from './Context/ThemeProvider';

export default function Header({currencys, fun, cur}){ // creacion del componente header con sus props
  const {theme, toggleTheme} = useTheme();
  
  return (
    <header className='app-header'> {/*creacion de elemento html con nombre de clase*/}
      <p>Crypto Stadistics</p> {/*Titulo*/}
      <div className='select-button'>
      <select  value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}> {/*elemento html select, cuyo valor es el prop cur que llama a la variable selCur, que en este caso tiene a la modena predeterminada de 'usd'*/
      /*tambien, tiene el event listener de que al cambiar el valor, se llame a la funcion del estado para que sea cambiado a la moneda seleccionada por el usuario*/ }
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
        {/*En esta funcion se utiliza .map para tomar los datos del json en que se convirtio la api, rastreando los objetos mediante item e index y dandole estos valores a cada una de las opciones del select*/ }
      </select>
      <button className='toogleMode' onClick={toggleTheme}>
        {theme.img}
      </button>
      </div>
    </header>
  )
}