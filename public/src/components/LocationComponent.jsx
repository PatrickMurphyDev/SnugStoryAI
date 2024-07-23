import React from 'react';

const LocationComponent = ({ lot }) => {
  return (
    <div className="location-component">
      <h1>{lot && lot.building ? lot.building.name : 'No lot.building Selected'}</h1>
      {lot && lot.building && (
        <>
          <p>{lot.building.description}</p>
          <ul>
            <li>Type: {lot.building.type}</li>
            <li>Owner: {lot.building.owner}</li>
            <li>Value: ${lot.building.value}</li>
          </ul>
        </>
      )}
      <h2>{lot ? `Lot: ${lot.name}` : 'No Lot Selected'}</h2>
      {lot && (
        <>
          <ul>
            <li>Size: {lot.size.x && lot.size.y ? lot.size.x * lot.size.y : "0"} sq. ft.</li>
            <li>Zone: {lot.zone ? lot.zone : "Default"}</li>
            <li>Price: ${lot.price ? lot.price : 0}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default LocationComponent;
