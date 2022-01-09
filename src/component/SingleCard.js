import "./SingleCard.css";

export default function SingleCard({card,handleChoice,flipped,disabled}){

  function handleClick(){
    if(!disabled){
        handleChoice(card);
    }
  }

  return (<div className="card">
    <div className={flipped ?"flipped" :"" }>
      <img className="front" src={card.src}  alt="front-img" />
      <img className="back" src="/img/cover.png" onClick={handleClick} alt="back-img" />
    </div>
  </div>)

}
