import React from 'react';

const LocationComponent = ({ lot, building }) => {
  return (
    <div className="location-component">
      <h1>{building ? building.name : 'No Building Selected'}</h1>
      {building && (
        <>
          <p>{building.description}</p>
          <ul>
            <li>Type: {building.type}</li>
            <li>Owner: {building.owner}</li>
            <li>Value: ${building.value}</li>
          </ul>
        </>
      )}
      <h2>{lot ? `Lot: ${lot.name}` : 'No Lot Selected'}</h2>
      {lot && (
        <>
          <ul>
            <li>Size: {lot.size} sq. ft.</li>
            <li>Zone: {lot.zone}</li>
            <li>Price: ${lot.price}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default LocationComponent;
