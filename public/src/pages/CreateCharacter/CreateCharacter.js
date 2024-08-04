import React, { useState } from 'react';
import BasicDetailsStep from './subpages/BasicDetailsStep';
import MentalDetailsStep from './subpages/MentalDetailsStep';
import PhysicalAppearanceStep from './subpages/PhysicalAppearanceStep';
import RelationshipsBackstoryStep from './subpages/RelationshipsBackstoryStep';
import PersonalityDetailsStep from './subpages/PersonalityDetailsStep';
import RoutineDetailsStep from './subpages/RoutineDetailsStep';
import MentalHealthDetailsStep from './subpages/MentalHealthDetailsStep';
import GoalsFavoritesStep from './subpages/GoalsFavoritesStep';
import './styles.css';

const CreateCharacter = () => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({
    age: '',
    gender: '',
    name: '',
    birthplace: '',
    culture: '',
    raceEthnicity: '',
    physicalSummary: '',
    hometown: '',
    currentResidence: '',
    languagesSpoken: '',
    introvertExtrovert: '',
    education: '',
    hobbies: '',
    socialMediaPresence: '',
    occupation: '',
    politicalViews: '',
    religiousViews: '',
    decisionMakingStyle: '',
    physicalDescription: '',
    styleDetails: '',
    travelExperiences: '',
    familyBackground: '',
    relationshipStatus: '',
    childhoodMemories: '',
    closestFriend: '',
    roleModels: '',
    pastRelationships: '',
    secretTalents: '',
    volunteerWork: '',
    proudestAchievement: '',
    personalFlaws: '',
    biggestRegret: '',
    biggestFear: '',
    greatestAmbition: '',
    personalMotto: '',
    petPeeves: '',
    strengths: '',
    weaknesses: '',
    preferredCommunicationStyle: '',
    senseOfHumor: '',
    conflictResolutionStyle: '',
    superstitions: '',
    typicalDailyRoutine: '',
    fitnessRoutine: '',
    allergies: '',
    mentalHealth: '',
    emotionalTriggers: '',
    dreamHome: '',
    mostPrizedPossession: '',
    favoriteSeason: '',
    favoriteChildhoodToy: '',
    collectingHabits: '',
    idealVacation: '',
    favoriteSports: '',
    favoriteBooks: '',
    favoriteMovies: '',
    favoriteMusicGenre: '',
    favoriteFoods: '',
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

  return (
    <>
    <div className="create-character create-character-card">
      <h1>Create a Character</h1>
      {step === 1 && <BasicDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} />}
      {step === 2 && <MentalDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <PhysicalAppearanceStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <RelationshipsBackstoryStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <PersonalityDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 6 && <RoutineDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 7 && <MentalHealthDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 8 && <GoalsFavoritesStep character={character} handleChange={handleChange} prevStep={prevStep} />}
</div>
<div className="create-character-card" style={{flexDirection:'column', display:'flex'}}>
  <div style={{flexDirection:'row', display:'flex', flex:'grow', width:'100%', position:'relative'}} >
    {step > 1 && <button type="button" style={{float:'left'}} onClick={prevStep}>Previous</button>}
    {step < 8 &&<button type="button" style={{float:'right'}} onClick={nextStep}>Next</button>}
  </div>
  <button type="submit">Save</button>
</div>
</>
);
};

export default CreateCharacter;