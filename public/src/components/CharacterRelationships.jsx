import React from 'react';

const CharacterRelationships = ({ relationships }) => {
  const renderRelationships = (type) => {
    return relationships[type].map((person, index) => (
      <li key={index}>{person}</li>
    ));
  };

  return (
    <div className="character-relationships">
      <h2>Relationships</h2>
      <div className="relationship-category">
        <h3>Friends</h3>
        <ul>{renderRelationships('friends')}</ul>
      </div>
      <div className="relationship-category">
        <h3>Disliked People</h3>
        <ul>{renderRelationships('disliked')}</ul>
      </div>
      <div className="relationship-category">
        <h3>Romantic Feelings</h3>
        <ul>{renderRelationships('romantic')}</ul>
      </div>
      <div className="relationship-category">
        <h3>Romantic History</h3>
        <ul>{renderRelationships('romanticHistory')}</ul>
      </div>
    </div>
  );
};

export default CharacterRelationships;
