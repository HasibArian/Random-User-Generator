import { faBorderStyle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";

export default function Person(props) {
  const [profiles, setPofiles] = useState([]);
  const { person } = props;
  const [count, setCount] = useState(0);

  const [isDuplicate, setIsDuplicated] = useState("");

  const {
    gender,
    name: { first, last },
    location: { country, city },
    email,
    picture: { large },
    cell,
  } = person;
  const handleProfileSave = () => {
    if (email !== isDuplicate) {
      setPofiles((profiles) => [...profiles, person]);
      setCount(count + 1);
      setIsDuplicated(email);
    }
    console.log(profiles); //focus on updating useState array, and then display it back out as people you have "saved"
  };
  return (
    <div className="randomPerson">
      <img src={large}></img>
      <h1>
        {first + " " + last}{" "}
        <p style={{ display: "inline-block" }}>{"(" + gender + ")"}</p>
      </h1>
      <p>{country + " " + city}</p>
      <p>Email: {email}</p>
      <p>phone: {cell}</p>
      <button
        className="btn"
        style={{ backgroundColor: "green" }}
        onClick={handleProfileSave}
      >
        SavePerson
      </button>

      <div className="form" style={{ overflowY: "auto", height: "350px" }}>
        <p style={{ textAlign: "left" }}># Of Saved People: {count}</p>
        {profiles.map((person) => {
          const {
            gender,
            name: { first, last },
            location: { country, city },
            email,
            picture: { large },
            cell,
          } = person;
          return <p key={email}>{first}</p>;
        })}
      </div>
    </div>
  );
}
