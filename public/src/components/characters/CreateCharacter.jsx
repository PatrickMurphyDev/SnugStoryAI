import React, { useState } from "react";
import axios from "axios";

const CreateCharacter = () => {
  const [character, setCharacter] = useState({
    name: { first: "", last: "" },
    age: "",
    biologicalGender: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !character.name.first ||
      !character.name.last ||
      !character.age ||
      !character.biologicalGender
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    axios
      .post("/api/characters", character)
      .then((response) => {
        console.log("Character created successfully:", response.data);
        setMessage("Character created successfully!");
      })
      .catch((error) => {
        console.error("Error creating character:", error);
        setMessage(
          "There was an error creating the character. Please try again."
        );
      });
  };

  return (
    <>
      <h2 style={{ color: "#fff" }}>Create Character</h2>
      <div className="create-character" style={{ color: "#fff" }}>
        <input
          type="text"
          name="first"
          value={character.name.first}
          onChange={handleChange}
          placeholder="First Name"
          required
        />{" "}
        <input
          type="text"
          name="last"
          value={character.name.last}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />{" "}
        <input
          type="number"
          name="age"
          value={character.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />{" "}
        <select
          name="biologicalGender"
          value={character.biologicalGender}
          onChange={handleChange}
        >
          {" "}
          <option value="male">Male</option>{" "}
          <option value="female">Female</option>{" "}
        </select>{" "}
        <button type="button" onClick={handleSubmit}>
          Create Character
        </button>{" "}
        {message && <p>{message}</p>}{" "}
        <span style={{ color: "grey", textDecoration: "italic" }}>
          After you create Basic Character Details, then you can add physical description details, personality details and relationship
          connections.
        </span>
      </div>
      <span>Character will be saved per island.</span>
    </>
  );
};

export default CreateCharacter;
