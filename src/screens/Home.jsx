import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { BASE_URL, RawURL } from "../data";
import Eventcards from "../components/EventCard";
import useOnlineStaus from "../hooks/onlineStaus";
import { NetworkContext } from "../contex/ConnectionContex";
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  let [filterDataEvent, setFilterDataEvent] = useState([]);
  const navigate = useNavigate();
  const {searchtext} = useOutletContext();
  const {setMediaData} = useOutletContext();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const RawData = await fetch(`${RawURL}/get-feed`);
    const result = await RawData.json();
    setData(result.data.data);
    setMediaData(result.data.data)
    setFilterDataEvent(result.data.data);
  };
  // console.log(data);
  
   useEffect(()=>{
    HSeachItem(searchtext)
    },[searchtext])

  const HSeachItem = (text) => {
    filterData = data.filter((item) => {
      return item.venueName.toLowerCase().includes(text.toLowerCase());
    });
    setFilterDataEvent(filterData);
  };


  const ShowHomeDetails =(homeId)=>{
    navigate(`/home-detail/${homeId}`);
  }

  return (
    <div>
      <div className="card-page">
        {filterDataEvent.length==0?<div class="loader"></div> : filterDataEvent.map((item) =>{
          // console.log(item);
          
           return(
          <Eventcards
            image={item.profilePicture}
            name={item.venueName}
            event={item.title}
            homeId ={item.id}
            onCardClick={ShowHomeDetails}
          />
        )})}
      </div>
    </div>
  );
};
export default Home;
