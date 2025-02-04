import { useEffect, useState } from "react";
import Header from "../components/Header";
import VenueCard from "../components/VenueCard";
import { RawURL, VENUE_URL } from "../data";
import { useNavigate, useOutletContext } from "react-router-dom";

const VenuePage = () => {
  let [VenueData, SetVenueData] = useState([]);
  let [filterDataEvent, setFilterDataEvent] = useState([]);
  const { searchtext } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    fetchVenueData();
  }, []);

  useEffect(() => {
    VSeachItem(searchtext);
  }, [searchtext]);

  const fetchVenueData = async () => {
    let Data = await fetch(`${RawURL}/get-all-venues`);
    let VenueData = await Data.json();
    SetVenueData(VenueData.data.rows);
    setFilterDataEvent(VenueData.data.rows);
  };

  const onCardClick = (venueId) => {
    navigate(`/venue-detail/${venueId}`);
  };

  const VSeachItem = (text) => {
    filterData = VenueData.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilterDataEvent(filterData);
  };

  return (
    <>
      <div className="card-page">
        { filterDataEvent.length==0? <div class="loader"></div> :  filterDataEvent.map((item) => {
          return (
            <VenueCard
              name={item.name}
              address={item.address}
              description={item.description}
              amenities={item.amenities}
              img={item.profileImage}
              venueId={item.id}
              onClick={onCardClick}
            />
          );
        })}
      </div>
    </>
  );
};
export default VenuePage;
