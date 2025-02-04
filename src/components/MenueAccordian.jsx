import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const MenueAccordion = ({ onAccordianClick, title, menuOptions }) => {
  let [isOpen, setisOpen] = useState(false);

  return (
    <>
      <div className="accordian"  onClick={()=>setisOpen(!isOpen)}>
        <span>{title}</span>
        <button
          style={{ borderRadius: "4px" }}
         
        >
          {" "}
          <span>
            {isOpen ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </span>{" "}
        </button>
      </div>
      {isOpen && (
        <ul className="menue-optiion">
          {menuOptions.map((item) => {
            // console.log(item.name);
            return (
              <div style={{ paddingLeft: "12px" }}>
                <li>{item.name}</li>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default MenueAccordion;
