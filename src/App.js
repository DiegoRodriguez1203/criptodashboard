//Se estan importando los componenetes y algunas librerias necesarias para que la App se ejecute correctamente.
import {useEffect, useState} from 'react' // Importacion de hooks
import "./App.css"; 
import { Line } from "react-chartjs-2";
import axios from 'axios'; 
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card'
import Convert from './Convert';
import Footer from './Footer'
import Header from './Header'
import {ThemeProvider} from "./Context/ThemeProvider";
// Se crea el componente App
export default function App() {
  const [coins, setCoins] = useState() // Se declaran variables de estado que se actualizaran con la Api
  const [currency, setCurrency] = useState()
  const [selCur, setSelCur] = useState("usd") // Se declara como valor por defecto "usd" en la variable selCur
  const getData = async () =>{ // Se utiliza async / await para hacer una funcion asincrona que traiga los datos de la API de coingecko

    //                                              ----------------------------------- Por medio de un template literal, se cambian los datos que son pedidos a la api, con el useState: selCur
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    const json = await response.json() // Se crea una variable que convierta los datos de esta api a objeto con el metodo .json
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()
    setCoins(json) // Se le asigna como variable, por medio de su funcion, a Coins, el resultado de la primera Api
    setCurrency(cur) // Se le asigna como variable, por medio de su funcion, a Cyrrency, el resultado de la segunda Api
  }
  useEffect(() => { // Se le pide a app que actualice la api cada vez que se ejecute
    getData()
  },[])
  useEffect(() => {
    getData()
  },[selCur])
 

  return ( // Constructor de toda la app en el DOM
    !coins ? "Cargando..." :( // Si coins aun no se ha completado, mostrar un titulo que diga cargando
    <div className='App'>
       <ThemeProvider> 
        <Header currencys={currency} fun={setSelCur} cur={selCur}/> {/*navegador de la app con tres props, dos de estos son de un hook useState*/}
       </ThemeProvider>
      <main>
        <CardPrincipal json={coins[0]} cur={selCur}/>{/*Se llama al componente de la card principal y se le asigna que su valor siempre sera el valor 0 del array, en este caso bitcoin*/}
        <div className="cards_con">
          { /*se crea una card con los valores asignados, siempre y cuando el index no sea igual a 0 (es decir bitocin)*/ }
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
            // creacion de la card con los valores seleccionados
            if(index != 0) {
             return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
      </main>
      {/*llamada del componente convert*/}
      <Convert/>
      {/*llamada del componente tableCoins con la prop coins*/}
      <TableCoins coins={coins}/>
      {/*llamada del footer*/}
      <Footer/>
    </div>
  )
  )

}
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
export const numberF = Intl.NumberFormat("es-ES")
