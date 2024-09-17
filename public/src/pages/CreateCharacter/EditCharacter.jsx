import React, { useState, useEffect } from "react";
import BasicDetailsStep from "./subpages/BasicDetailsStep";
import MentalDetailsStep from "./subpages/MentalDetailsStep";
import PhysicalAppearanceStep from "./subpages/PhysicalAppearanceStep";
import RelationshipsBackstoryStep from "./subpages/RelationshipsBackstoryStep";
import PersonalityDetailsStep from "./subpages/PersonalityDetailsStep";
import RoutineDetailsStep from "./subpages/RoutineDetailsStep";
import MentalHealthDetailsStep from "./subpages/MentalHealthDetailsStep";
import GoalsFavoritesStep from "./subpages/GoalsFavoritesStep";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./styles.css";

const EditCharacter = ({ character1, data }) => {
    const [character, setCharacter] = useState(character1 || {});
    const [characterData, setCharacterData] = useState(data || {});

  useEffect(() => {
    // Load character data from props or backend if needed
    if (character) {
      setCharacter(character);
    } else {
      //TODO: Fetch character data from backend http://localhost:5000/api/characters/:id using AXIOS
    }
  }, [character]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const items = [
    {
      uuid: 0,
      heading: "Basic Details",
      content: () => (
        <BasicDetailsStep character={character} handleChange={handleChange} />
      ),
    },
    {
      uuid: 1,
      heading: "Mental Details",
      content: () => (
        <MentalDetailsStep character={character} handleChange={handleChange}  />
      ),
    },
    {
      uuid: 2,
      heading: "Physical Appearance",
      content: () => (
        <PhysicalAppearanceStep character={character} handleChange={handleChange}  />
      ),
    },
    {
      uuid: 3,
      heading: "Relationships & Backstory",
      content: () => (
        <RelationshipsBackstoryStep character={character} handleChange={handleChange}  />
      ),
    },
    {
      uuid: 4,
      heading: "Personality",
      content: () => (
        <PersonalityDetailsStep character={character} handleChange={handleChange}  />
      ),
    },
    {
      uuid: 5,
      heading: "Mental Health",
      content: () => (
        <MentalHealthDetailsStep character={character} handleChange={handleChange}  />
      ),
    },
    {
      uuid: 6,
      heading: "Schedule & Routine",
      content: () => (
        <RoutineDetailsStep character={character} handleChange={handleChange}  />
      ),
    },
    {
      uuid: 7,
      heading: "Favorites & Goals",
      content: () => (
        <GoalsFavoritesStep character={character} handleChange={handleChange}  />
      ),
    },
  ];

  return (
    <>
      <div className="edit-character edit-character-card">
        <h1>Edit Character</h1>
        <Accordion>
          {items.map((item) => (
            <AccordionItem key={item.uuid}>
              <AccordionItemHeading>
                <AccordionItemButton style={{ padding: "5px" }}>{item.heading}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{item.content()}</AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="edit-character-card" style={{ flexDirection: "column", display: "flex" }}>
        <div style={{ flexDirection: "row", display: "flex", flex: "grow", width: "100%", position: "relative" }}></div>
        <button type="submit">Save Changes</button>
      </div>
    </>
  );
};

export default EditCharacter;
