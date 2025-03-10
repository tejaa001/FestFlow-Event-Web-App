import { useEffect, useState } from "react";
import { RawURL } from "../data";

const UpComingEvent = () => {
  const [UpComingData, setUpComingData] = useState([]);

  useEffect(() => {
    fetchEventData();
  }, []);
  const fetchEventData = async () => {
    const data = await fetch(`${RawURL}/get-all-upcoming-events`);
    const JsonData = await data.json();
    setUpComingData(JsonData.data);
    console.log(JsonData.data);
  };
  return (
    <>
      {UpComingData.map((item) => {
        return (
          <>
            <div className="image-container">
              <img src={item.image} alt="" />
            </div>

            <span>{}</span>
          </>
        );
      })}
      <h1>UpComing</h1>
    </>
  );
};

export default UpComingEvent;
