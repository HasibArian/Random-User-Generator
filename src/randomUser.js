import React, { useState, useEffect, onMouseEnter, onMouseLeave } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPhone,
  faSearchLocation,
  faSignature,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

export default function RandomUser() {
  const [results, setRandomPerson] = useState([]);

  const [chosen, setChosen] = useState("");

  const [info, setInfo] = useState("");
  //use state and effect hooks to fetch data and to store it.
  //step 2: define useeffect inside of your component

  //step 3: define URL and then set up ASYNCH function

  const fetchData = async () => {
    setChosen("---");
    try {
      const url = "https://randomuser.me/api/";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const { results } = data; //-->obtains an array. push this into your usestate. Then you iterate over your users and then destructor.
      setRandomPerson(results);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    //upon re-render, this is a side effect. it's only done once.
    fetchData(); //note that when you call setRandomPerson you are triggering re-render and byt extension useffect again. Leads to infinite loop therefore, you need '[]'
  }, []); //-->empty dependancy list therefore only runs once.

  const handleMouseEnter = (e) => {
    if (e.target.className === "phone") {
      setChosen(results[0].cell);
    }
    if (e.target.className === "gender") {
      setChosen(results[0].gender);
    }
    if (e.target.className === "name") {
      setChosen(results[0].name.first + " " + results[0].name.last);
    }
    if (e.target.className === "location") {
      setChosen(results[0].location.state);
    }
  };
  const handleMouseLeave = (e) => {};
  return (
    <>
      <div className="tophalf">
        {results.map((res) => {
          const {
            cell,
            gender,
            name,
            location,
            picture: { large },
          } = res; //nested destructoring

          return (
            // <ul style={{ listStyle: "none" }}>
            //   <li key={cell}>
            <div>
              <img
                src={large}
                style={{ borderRadius: "50%", marginTop: "2%" }}
              ></img>
              <p>{chosen}</p>
              <div className="information">
                <p
                  className="phone"
                  style={{
                    display: "inline-block",
                    paddingInline: "10px",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <FontAwesomeIcon icon={faPhone} size="2x" />
                </p>
                <p
                  className="gender"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ display: "inline-block", paddingInline: "10px" }}
                >
                  <FontAwesomeIcon icon={faVenusMars} size="2x" />
                </p>
                <p
                  className="name"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ display: "inline-block", paddingInline: "10px" }}
                >
                  <FontAwesomeIcon icon={faSignature} size="2x" />
                </p>
                <p
                  className="location"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ display: "inline-block", paddingInline: "10px" }}
                >
                  <FontAwesomeIcon icon={faSearchLocation} size="2x" />
                </p>
              </div>
            </div>

            //   </li>
            // </ul>
          );
        })}
      </div>
      <div className="bottomhalf">
        <button onClick={fetchData}>Change Text</button>
      </div>
    </>
  );
}
