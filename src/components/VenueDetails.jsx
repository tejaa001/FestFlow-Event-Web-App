import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { RawURL } from "../data";
import MenueAccordion from "./MenueAccordian";

const VenueDetails = () => {
  const [Details, setDetails] = useState([]);
  const [Amenities, setAmenities] = useState([]);
  let [vegAccordianData, setvegAccordianData] = useState([]);
  const [accordianValue, setaccordianValue] = useState("");

  const { venueId } = useParams();

  useEffect(() => {
    fetchVenueDetailsData();
  }, []);

  const fetchVenueDetailsData = async () => {
    const raw = await fetch(`${RawURL}/get-venue-details?venueId=${venueId}`);
    const jData = await raw.json();
    setDetails(jData.data);

    setAmenities(jData.data.amenities);

    setvegAccordianData(jData.data.packages);
  };
  // console.log(vegAccordianData);

  const onAccordianClick = (menueType) => {
    setaccordianValue(menueType);
  };
  console.log(accordianValue);

  return (
    <>
      <div className="card-page">
        {Amenities.length == 0 ? (
          <div class="loader"></div>
        ) : (
          <div className="V-detailsConatiner">
            <div className="img-box">
              <img src={Details.profileImage} alt="" />
            </div>

            <div className="V-details">
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <h1>{Details.name} </h1>
                <h1
                  style={{
                    backgroundColor: "green",
                    padding: "3px 10px 3px 10px",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  {Details.avg_rating}
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#ffffff", width: "26px" }}
                  />
                </h1>
              </p>
              <p style={{ display: "flex" }}>
                {" "}
                <h4>Base Price :</h4> {Details.basePrice}
              </p>
              <p style={{ display: "flex" }}>
                {" "}
                <h4>Average Rating :</h4>
                {Details.avg_rating}
              </p>
              <p style={{ display: "flex" }}>
                <h4>Events Available : </h4>
                {Details.eventsAvailable}
              </p>
              <p style={{ display: "flex", flexWrap: "wrap" }}>
                <h4>Description :</h4> {Details.description}
              </p>
              <p style={{ display: "flex" }}>
                {" "}
                <h4>Address :</h4>
                {Details.address}
              </p>

              <p className="detali-amenities">
                {Amenities.map((item) => {
                  return (
                    <>
                      <span className="amenities">
                        {item.name} - {item.value}
                      </span>
                    </>
                  );
                })}
              </p>
            </div>
          </div>
        )}
        <div className="packages">
          {vegAccordianData.map((section) => {
            console.log(section);

            return (
              <>
                <section className="section">
                  <h2>{section.packageName}- Secetion </h2>
                  {section.packageItems.map((item) => {
                    // console.log(item);
                    return (
                      <>
                        <MenueAccordion
                          title={item.menuType}
                          menuOptions={item.menuOptions}
                          onAccordianClick={onAccordianClick}
                          isOpen={item.menuType == accordianValue}
                        />
                      </>
                    );
                  })}
                </section>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VenueDetails;
