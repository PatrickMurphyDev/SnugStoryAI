import React, { useState, useEffect } from "react";

const SimulationTimeControls = ({ simTime }) => {
  const [rateOfTime, setRateOfTime] = useState(simTime.rateOfTime);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState(
    simTime.currentTimeOfDay
  );
  const [currentDate, setCurrentDate] = useState(simTime.getDate());
  const [currentTime, setCurrentTime] = useState(simTime.getTime12Hr());

  useEffect(() => {
    const updateDateTime = (data) => {
      setCurrentTimeOfDay(data.currentTimeOfDay);
      setCurrentDate(data.date);
      setCurrentTime(simTime.getTime12Hr());
    };

    simTime.onTimeUpdate(updateDateTime);

    return () => {
      simTime.clearTimeUpdate(updateDateTime);
    };
  }, [simTime]);

  const handleSpeedChange = (speed) => {
    setRateOfTime(speed);
    simTime.setRateOfTime(speed);
  };

  const handleTimeChange = (e) => {
    const newTimeOfDay = parseInt(e.target.value, 10);
    setCurrentTimeOfDay(newTimeOfDay);
    simTime.currentTimeOfDay = newTimeOfDay;
  };

  return (
    <div
      className="simulation-time-controls"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div className="speed-controls">
        <button
          style={rateOfTime === 0 ? { backgroundColor: "red" } : {}}
          onClick={() => handleSpeedChange(0)}
        >
          Pause
        </button>
        <button
          style={rateOfTime === 1 ? { backgroundColor: "red" } : {}}
          onClick={() => handleSpeedChange(1)}
        >
          1x Speed
        </button>
        <button
          style={rateOfTime === 2 ? { backgroundColor: "red" } : {}}
          onClick={() => handleSpeedChange(2)}
        >
          2x Speed
        </button>
        <button
          style={rateOfTime === 3 ? { backgroundColor: "red" } : {}}
          onClick={() => handleSpeedChange(3)}
        >
          3x Speed
        </button>
      </div>
      <div className="time-slider">
        <input
          type="range"
          min="0"
          max="1440"
          readOnly
          value={currentTimeOfDay}
          //onChange={handleTimeChange}
        />
      </div>
      <div className="date-time-display">
        <p>
          Date: {currentDate} Time: {currentTime}
        </p>
      </div>
    </div>
  );
};

export default SimulationTimeControls;
