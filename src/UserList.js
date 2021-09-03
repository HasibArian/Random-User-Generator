import React from "react";
import { useEffect, useState } from "react";
import Person from "./Person";

//fetch api, send it down the pipe
export default function UserList() {
  const [person, setPerson] = useState([]);

  const [clicked, setClicked] = useState(false);

  const fetchData = async () => {
    //async
    try {
      const url = "https://randomuser.me/api/"; //try-catch block
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setPerson(data.results[0]); //set the data to the useState.
      setClicked(true); /// we can use states to check when the fetch data has been fetched, and when it has not. This is especially helpful!
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(person.login.uuid);
    //store the data now into a state.
  }, []); //empty dependancy list, therefore nothing will trigger its rerender

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <button className="btn" onClick={fetchData}>
          Get Random Person
        </button>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        {clicked && <Person person={person} />}
      </div>

      {/* if clicked is true then display person, we leave this state within async fetch data, this means that async Fetch Data will now HAVE to run before we render person. */}

      <div className="button">{/* <SavePerson person={person} /> */}</div>
    </div>
  );
}
