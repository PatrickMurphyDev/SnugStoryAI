import EventEmitter from 'events';

class SimulationTime extends EventEmitter {
  constructor() {
    super();
    this._isPaused = false;
    this._rateOfTime = 1; // 1x, 2x, 3x
    this._currentTimeOfDay = 0; // in minutes (0-1440)
    this._currentDayOfWeek = 1; // 1: Sunday, 2: Monday, ..., 7: Saturday
    this._dayOfMonth = 4;
    this._month = 7; // 1: January, ..., 12: December
    this._year = 2024;
  }

  // Getter and setter for isPaused
  get isPaused() {
    return this._isPaused;
  }

  set isPaused(value) {
    this._isPaused = value;
  }

  // Getter and setter for rateOfTime
  get rateOfTime() {
    return this._rateOfTime;
  }

  set rateOfTime(value) {
    if(value <= 0){
      this.pause();
    }else if(this._isPaused){
      this.start();
    }
    this._rateOfTime = value;
  }

  // Getter and setter for currentTimeOfDay
  get currentTimeOfDay() {
    return this._currentTimeOfDay;
  }

  set currentTimeOfDay(value) {
    this._currentTimeOfDay = value;
  }

  // Getter and setter for currentDayOfWeek
  get currentDayOfWeek() {
    return this._currentDayOfWeek;
  }

  set currentDayOfWeek(value) {
    this._currentDayOfWeek = value;
  }

  // Getter and setter for dayOfMonth
  get dayOfMonth() {
    return this._dayOfMonth;
  }

  set dayOfMonth(value) {
    this._dayOfMonth = value;
  }

  // Getter and setter for month
  get month() {
    return this._month;
  }

  set month(value) {
    this._month = value;
  }

  // Getter and setter for year
  get year() {
    return this._year;
  }

  set year(value) {
    this._year = value;
  }

  // Function to get the time in HH:MM 24-hour format
  getTime() {
    const hours = Math.floor(this._currentTimeOfDay / 60);
    const minutes = this._currentTimeOfDay % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  // Function to get the time in HH:MM AM/PM 12-hour format
  getTime12Hr() {
    let hours = Math.floor(this._currentTimeOfDay / 60);
    const minutes = this._currentTimeOfDay % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  }

  // Function to get the date in DD/MM/YYYY format
  getDate() {
    return `${String(this._dayOfMonth).padStart(2, '0')}/${String(this._month).padStart(2, '0')}/${this._year}`;
  }

  // Function to update the time
  updateTime() {
    if (this._isPaused) return;

    this._currentTimeOfDay += this._rateOfTime;

    // logic for moving to next day, after midnight
    if (this._currentTimeOfDay >= 1440) {
      this._currentTimeOfDay %= 1440;
      this._currentDayOfWeek = this._currentDayOfWeek % 7 + 1;
      this._dayOfMonth++;

      // Simplified month end handling
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (this._dayOfMonth > daysInMonth[this._month - 1]) {
        this._dayOfMonth = 1;
        this._month++;
        if (this._month > 12) {
          this._month = 1;
          this._year++;
        }
      }
    }

    // Emit an event to notify subscribers
    this.emit('timeUpdate', {
      time24: this.getTime(),
      time12: this.getTime12Hr(),
      currentTimeOfDay: this._currentTimeOfDay,
      date: this.getDate(),
      isPaused: this._isPaused,
      rateOfTime: this._rateOfTime
    });
  }

  // Function to start the simulation time
  start() {
    this._isPaused = false;
    this.intervalId = setInterval(() => this.updateTime(), 1000); // Update every second
  }

  // Function to pause the simulation time
  pause() {
    this._isPaused = true;
    clearInterval(this.intervalId);
  }

  // Function to set the rate of time
  setRateOfTime(rate) {
    this._rateOfTime = rate;
  }

  // Function to subscribe to time updates
  onTimeUpdate(listener) {
    this.on('timeUpdate', listener);
  }

  // Function to clear a specific time update listener
  clearTimeUpdate(callback) {
    this.removeListener('timeUpdate', callback);
  }

  // Function to clear all listeners
  clearAllListeners() {
    this.removeAllListeners();
  }

  // Function to dispose the simulation time instance
  dispose() {
    this.pause();
    this.clearAllListeners();
  }
}

export default SimulationTime;
