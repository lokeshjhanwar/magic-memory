import {useState,useEffect} from "react";
import SingleCard from "./component/SingleCard";

import './App.css'

const images=[
  {"src" : "/img/helmet-1.png" , matched:false },
  {"src" : "/img/potion-1.png" , matched:false },
  {"src" : "/img/ring-1.png" , matched:false },
  {"src" : "/img/scroll-1.png" , matched:false },
  {"src" : "/img/shield-1.png" , matched:false },
  {"src" : "/img/sword-1.png" , matched:false }
]

function App() {
  const [cards,setCards]=useState([]);
  const [turn,setTurn]=useState(0);
  const [disabled,setDisabled]=useState(false);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);

 function shuffleCards(){
   const shuffuledCards=[...images,...images]
   .sort(()=> Math.random()-0.5)
   .map((card,index)=> ({ ...card,id:index}));

   setCards(shuffuledCards);
   setTurn(0);
 }

 function handleChoice(card){
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
   // we can't do comparing here because setChoiceOne is a Asynchronis function
 }

 // compare 2 selected cards
 useEffect(()=>{
   if(choiceOne && choiceTwo){
     setDisabled(true);
       if(choiceOne.src===choiceTwo.src){
         console.log("Cards Matched");
         setCards((prevCards)=>{
           return prevCards.map((card)=>{
             if(card.src===choiceOne.src){
               return {...card, matched:true};
             }else{
               return card;
             }
           })
         })
       }else{
         console.log("Cards Doesn't Match");
       }
       setTimeout(()=>resetTurn() ,1000);
   }
 },[choiceOne,choiceTwo])

  useEffect(()=>{
    shuffleCards()
  },[]);

 function resetTurn(){
   setChoiceOne(null);
   setChoiceTwo(null);
   setDisabled(false);
   setTurn(prevTurn=>prevTurn+1);
 }


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} >New Game</button>
      <div className="card-grid">
        {cards.map(card=>(
            <SingleCard
               key={card.id}
               card={card}
               handleChoice={handleChoice}
               flipped={card===choiceOne || card===choiceTwo || card.matched}
               disabled={disabled}
            />
        ))}
      </div>
      <div>Turns :{turn}</div>
    </div>
  );
}

export default App
