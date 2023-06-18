import React from "react"
import Die from "./components/Die.jsx";
import uuid from 'react-uuid';
import  {Confetti} from "react-confetti";
import ReactConfetti from "react-confetti";




export default function App(){

    function allNewDice(){
        return(
            [
                {id:1,value:Math.floor(Math.random()*6),isClicked:false},
                {id:2,value:Math.floor(Math.random()*6),isClicked:false},
                {id:3,value:Math.floor(Math.random()*6),isClicked:false},
                {id:4,value:Math.floor(Math.random()*6),isClicked:false},
                {id:5,value:Math.floor(Math.random()*6),isClicked:false},
                {id:6,value:Math.floor(Math.random()*6),isClicked:false},
                {id:7,value:Math.floor(Math.random()*6),isClicked:false},
                {id:8,value:Math.floor(Math.random()*6),isClicked:false},
                {id:9,value:Math.floor(Math.random()*6),isClicked:false},
                {id:10,value:Math.floor(Math.random()*6),isClicked:false}
            ]
        )
    }


    const[dice,setDice]=React.useState(allNewDice())
    const[win,setWin]=React.useState(false)
    const[selectedItems,setSelectedItems]=React.useState([])

    let diceArray=dice.map(element=>(
        <Die
            key={uuid()}
            item={
                {
                    id:element.id,
                    value:element.value,
                    isClicked:element.isClicked,
                    toggle:()=>handleClick(element.id)
                }
            }





        />
    ))

    function Roll(){
        if(!win) {
            setDice(prevSquares => {
                return prevSquares.map(item => (
                    item.isClicked
                        ? item
                        : {...item, value: Math.floor(Math.random() * 6)}
                ))
            })
        }
        else{
            setDice(allNewDice())
        }
    }

    function findByid(id,array){
        for (let i=0;i<array.length;i++) {
            if (array[i].id===id) {
                return array[i]
            }
        }
    }

    /**
     * this function checks if the value of a die object with a given id
     * is equal to the values of every other die object in a given array (of die objects)
     * @param id element to test
     * @param array
     * @returns {boolean} false if the tested die's value is unequal to at least one of the dice's value in the array
     *
     */
    function areIdenticalValues(id,array){
        for(let i=0;i<array.length;i++){
            if(findByid(id,dice).value!==array[i].value){
                return false
            }
        }

        return true;

    }


    function handleClick(id){
        //if the selectedItems array is empty ,push whichever selected value to it
            //if there already are  values, check that the newly selected one
            // matches the already selected ones
                //if that's the case ,push the new value
                    //if not,unselect the old values and start a new series
        if(!selectedItems.length){
            setSelectedItems(prevState => (
                [findByid(id,dice),...prevState]
            ))
        }

        else {
            if(areIdenticalValues(id,selectedItems)){
                setSelectedItems(prevState => (
                    [findByid(id,dice),...prevState]
                ))

                if(selectedItems.length===9){
                    setWin(true)
                }
            }
            else{
            //wrong element selected
                for (let i=0;i<selectedItems.length;i++) {
                    let id=findByid(selectedItems[i].id,dice).id; //find the  selectedItem's id in the dice array
                    //toggle that selectedItem's state to off
                    setDice(prevState=>{
                        return prevState.map(item=>(
                            item.id===id
                            ?{...item,isClicked:false}
                            :item
                        ))
                    })
                }
                //set the element that wronged out the series as the new series' starter
                setSelectedItems([findByid(id,dice)]);

            }
        }



        setDice(prevSquares => {
            return prevSquares.map((square) => {
                return square.id === id ? {...square,isClicked: !square.isClicked} : square
            })
        })


    }


    return(
            <div className="container--inside">
                <div className="header--section">
                    <h1>Tenzies</h1>
                    <h3>
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </h3>
                </div>
                {win && <ReactConfetti/>}
                <div className="boxes--section">
                    {diceArray}
                    <button className="btn--roll" onClick={Roll}>
                        {win?"Play Again":"Roll"}
                    </button>
                </div>


            </div>



    )
}