import React, { useState } from "react";
import BasicDetailsStep from "./subpages/BasicDetailsStep";
import MentalDetailsStep from "./subpages/MentalDetailsStep";
import PhysicalAppearanceStep from "./subpages/PhysicalAppearanceStep";
import RelationshipsBackstoryStep from "./subpages/RelationshipsBackstoryStep";
import PersonalityDetailsStep from "./subpages/PersonalityDetailsStep";
import RoutineDetailsStep from "./subpages/RoutineDetailsStep";
import MentalHealthDetailsStep from "./subpages/MentalHealthDetailsStep";
import GoalsFavoritesStep from "./subpages/GoalsFavoritesStep";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./styles.css";

const CreateCharacter = () => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({
    age: "",
    gender: "",
    name: "",
    birthplace: "",
    culture: "",
    raceEthnicity: "",
    physicalSummary: "",
    hometown: "",
    currentResidence: "",
    languagesSpoken: "",
    introvertExtrovert: "",
    education: "",
    hobbies: "",
    socialMediaPresence: "",
    occupation: "",
    politicalViews: "",
    religiousViews: "",
    decisionMakingStyle: "",
    physicalDescription: "",
    styleDetails: "",
    travelExperiences: "",
    familyBackground: "",
    relationshipStatus: "",
    childhoodMemories: "",
    closestFriend: "",
    roleModels: "",
    pastRelationships: "",
    secretTalents: "",
    volunteerWork: "",
    proudestAchievement: "",
    personalFlaws: "",
    biggestRegret: "",
    biggestFear: "",
    greatestAmbition: "",
    personalMotto: "",
    petPeeves: "",
    strengths: "",
    weaknesses: "",
    preferredCommunicationStyle: "",
    senseOfHumor: "",
    conflictResolutionStyle: "",
    superstitions: "",
    typicalDailyRoutine: "",
    fitnessRoutine: "",
    allergies: "",
    mentalHealth: "",
    emotionalTriggers: "",
    dreamHome: "",
    mostPrizedPossession: "",
    favoriteSeason: "",
    favoriteChildhoodToy: "",
    collectingHabits: "",
    idealVacation: "",
    favoriteSports: "",
    favoriteBooks: "",
    favoriteMovies: "",
    favoriteMusicGenre: "",
    favoriteFoods: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSaveCharacter = () => {
    const { name, age, gender } = character;

    // Validate required fields
    if (!name || !age || !gender) {
      alert("Please fill out the required fields: Name, Age, and Gender.");
      return;
    }

    // Send a POST request to the server to save the character
    axios
      .post("/api/characters", { name, age, gender })
      .then((response) => {
        console.log("Character saved successfully:", response.data);
        alert("Character created successfully!");
      })
      .catch((error) => {
        console.error("Error saving character:", error);
        alert("There was an error saving the character. Please try again.");
      });
  };

  const items = [
    {
      uuid: 0,
      heading: "Basic Details",
      content: () => (
        <BasicDetailsStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      ),
    },
    {
      uuid: 1,
      heading: "Mental Details",
      content: () => (
        <MentalDetailsStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      uuid: 2,
      heading: "Physical Appearance" ,
      content: () => (
        <PhysicalAppearanceStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      uuid: 3,
      heading: "Relationships & Backstory",
      content: () => (
        <RelationshipsBackstoryStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      uuid: 4,
      heading: "Personality",
      content: () => (
        <PersonalityDetailsStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      uuid: 5,
      heading: "Mental Health",
      content: () => (
        <MentalHealthDetailsStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      uuid: 6,
      heading: "Schedule & Routine",
      content: () => (
        <RoutineDetailsStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      uuid: 7,
      heading: "Favorites & Goals",
      content: () => (
        <GoalsFavoritesStep
          character={character}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    }
  ];

  return (
    <>
      <div className="create-character create-character-card">
        <h1>Create a Character</h1>
        <Accordion>
          {items.map((item) => (
            <AccordionItem key={item.uuid}>
              <AccordionItemHeading>
                <AccordionItemButton style={{ padding: "5px" }}>
                  {item.heading}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{item.content()}</AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div
        className="create-character-card"
        style={{ flexDirection: "column", display: "flex" }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            flex: "grow",
            width: "100%",
            position: "relative",
          }}
        ></div>
        <button type="button" onClick={handleSaveCharacter}>
          Add New Character
        </button>
      </div>
    </>
  );
};

export default CreateCharacter;
