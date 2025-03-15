const VenueCard = ({ name, address, description, amenities,img, venueId ,onClick }) => {
  description_size = description.length;
  if (description_size >= 20) {
    var trimed_description = description.slice(0, 100);
  }
  return (
    <div className="Venue-cards-container" onClick={()=>onClick(venueId)}>
      <div className="img-cont">
      <img src={img} alt="" />
      </div>
      <div className="Venue-details-container">
        <span>Venue : <span>{name}</span> </span> 
        {/* <span>Address :</span> {address}
        <br />
        <span>Description :</span>
        {trimed_description}...
        <br /> */}
        <div className="amenities-box">
          {amenities.map((element) => {
            return <span className="amenities">{element.name}</span>;
          })}
        </div>
      </div>
    </div>
  );
};
export default VenueCard;
