/*importacion de los elementos necesarios, entre ellos el componente graph (que es la grafica principal)*/ 
import "./Card.css"
import Graph from "./Graph"
import {colorDec} from './App'
/*Componente card*/ 
export default function Card({coinId, cur, porcentaje, price, img}){
    return (
        /*Como props del componente card se toman los datos traidos desde el api*/
        <div className="card">
            {/*Se agrega la imagen traida de las criptos, se le agrega un titulo, los porcentajes y precios variables tambien extraidos de los elementos JSON*/}
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                         {/*Se utilizan estos mismos atributos dentro de la grafica para variar los datos de esta si es que se cambiara la criptomoneda*/}
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}