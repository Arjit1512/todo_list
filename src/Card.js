import React from "react";
import './styles.css'
function Card(props){
    return (
        <div  className = "box">
            <h5>{props.peru}</h5>
            <p>{props.sankya}</p>
            <p>{props.google}</p>
        </div>
    )
}

export default Card;