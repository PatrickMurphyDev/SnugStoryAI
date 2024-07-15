import React, { useState } from 'react';

const CharacterSkills = ({ character }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderCategories = () => {
    const categories = [...new Set(character.attributes.skills.map(skill => skill.mainCategory))];
    return categories.map(category => (
      <li key={category} onClick={() => handleCategoryClick(category)}>
        {category}
      </li>
    ));
  };

  const renderSkillDetails = () => {
    if (!selectedCategory) {
      return <p>Select a category to view details</p>;
    }

    const skills = character.attributes.skills.filter(skill => skill.mainCategory === selectedCategory);
    return skills.map(skill => (
      <div key={`${skill.mainCategory}-${skill.subCategory}`}>
        <h3>{skill.subCategory}</h3>
        <p>Value: {skill.value}</p>
      </div>
    ));
  };

  return (
    <div className="character-skills-display">
      <div className="categories">
        <h2>Skill Categories</h2>
        <ul>
          {renderCategories()}
        </ul>
      </div>
      <div className="skill-details" style={{"display":"none"}}>
        <h2>Skill Details</h2>
        {renderSkillDetails()}
      </div>
    </div>
  );
};

export default CharacterSkills;
