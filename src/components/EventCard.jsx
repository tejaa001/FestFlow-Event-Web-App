const Eventcards = ({ image, name, event,homeId,onCardClick }) => {
  return (
    <div className="cards-container" onClick ={()=>onCardClick(homeId)}>
      <div className="image-container">
        <img src={image}></img>
      </div>
      <div className="details-container">
        <span>Venue : {name}</span>
        <span>Title : {event}</span>
      </div>
    </div>
  );
};

export default Eventcards;
