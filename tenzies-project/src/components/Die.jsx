import React from "react"

export default function Die(props){
    const{id,value,isClicked,toggle}=props.item

    const styles={backgroundColor: isClicked ?"#59E391":"white"}
    return(
        <div
            style={styles}
            key={id}
            className="die--box"
            onClick={toggle}
        >
            <p>{value}</p>
        </div>
    )
}