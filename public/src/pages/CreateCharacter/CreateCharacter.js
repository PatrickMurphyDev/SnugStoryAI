import React, { useState } from 'react';
import BasicDetailsStep from './subpages/BasicDetailsStep.js';
import OccupationEducationStep from './subpages/MentalDetailsStep.js';
import PhysicalStyleStep from './subpages/PhysicalAppearanceStep.js';
import RelationshipsStep from './subpages/RelationshipsBackstoryStep.js';
import HealthDetailsStep from './subpages/HealthDetailsStep.js';
import MentalHealthStep from './subpages/MentalHealthDetailsStep.js';
import FavoritesStep from './subpages/GoalsFavoritesStep.js';
import '../../index.css';
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
    occupation: '',
    education: '',
    politicalViews: '',
    religiousViews: '',
    physicalDescription: '',
    styleDetails: '',
    relationships: '',
    healthDetails: '',
    mentalHealthDetails: '',
    favorites: '',
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
    <div className="create-character">
      <h1>Create a Character</h1>
      {step === 1 && <BasicDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} />}
      {step === 2 && <OccupationEducationStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <PhysicalStyleStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <RelationshipsStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <HealthDetailsStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 6 && <MentalHealthStep character={character} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 7 && <FavoritesStep character={character} handleChange={handleChange} prevStep={prevStep} />}
    </div>
  );
};

export default CreateCharacter;
