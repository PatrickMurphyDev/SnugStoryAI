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

/*{step === 1 && (
          <BasicDetailsStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <MentalDetailsStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <PhysicalAppearanceStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <RelationshipsBackstoryStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 5 && (
          <PersonalityDetailsStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 6 && (
          <RoutineDetailsStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 7 && (
          <MentalHealthDetailsStep
            character={character}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 8 && (
          <GoalsFavoritesStep
            character={character}
            handleChange={handleChange}
            prevStep={prevStep}
          />
        )}{step > 1 && (
            <button
              type="button"
              style={{ width: "47%", padding: "2%" }}
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {step < 8 && (
            <button
              type="button"
              style={{ width: "47%", padding: "2%", marginLeft: "2%" }}
              onClick={nextStep}
            >
              Next
            </button>
          )} */

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
                <AccordionItemButton style={{padding:'5px'}}>{item.heading}</AccordionItemButton>
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
        >
        </div>
        <button type="submit">Save</button>
      </div>
    </>
  );
};

export default CreateCharacter;