import EventEmitter from 'events';

class SimulationTime extends EventEmitter {
  constructor() {
    super();
    this.isPaused = false;
    this.rateOfTime = 1; // 1x, 2x, 3x
    this.currentTimeOfDay = 0; // in minutes (0-1440)
    this.currentDayOfWeek = 1; // 1: Sunday, 2: Monday, ..., 7: Saturday
    this.dayOfMonth = 1;
    this.month = 1; // 1: January, ..., 12: December
    this.year = 2023;
  }

  // Function to get the time in HH:MM 24-hour format
  getTime() {
    const hours = Math.floor(this.currentTimeOfDay / 60);
    const minutes = this.currentTimeOfDay % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  // Function to get the time in HH:MM AM/PM 12-hour format
  getTime12Hr() {
    let hours = Math.floor(this.currentTimeOfDay / 60);
    const minutes = this.currentTimeOfDay % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  }

  // Function to get the date in DD/MM/YYYY format
  getDate() {
    return `${String(this.dayOfMonth).padStart(2, '0')}/${String(this.month).padStart(2, '0')}/${this.year}`;
  }

  // Function to update the time
  updateTime() {
    if (this.isPaused) return;

    this.currentTimeOfDay += this.rateOfTime;
    if (this.currentTimeOfDay >= 1440) {
      this.currentTimeOfDay %= 1440;
      this.currentDayOfWeek = this.currentDayOfWeek % 7 + 1;
      this.dayOfMonth++;
        
      // Simplified month end handling
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (this.dayOfMonth > daysInMonth[this.month - 1]) {
        this.dayOfMonth = 1;
        this.month++;
        if (this.month > 12) {
          this.month = 1;
          this.year++;
        }
      }
    }

    // Emit an event to notify subscribers
    this.emit('timeUpdate', {
      time24: this.getTime(),
      time12: this.getTime12Hr(),
      date: this.getDate(),
      isPaused: this.isPaused,
      rateOfTime: this.rateOfTime
    });
  }

  // Function to start the simulation time
  start() {
    this.isPaused = false;
    this.intervalId = setInterval(() => this.updateTime(), 1000); // Update every second
  }

  // Function to pause the simulation time
  pause() {
    this.isPaused = true;
    clearInterval(this.intervalId);
  }

  // Function to set the rate of time
  setRateOfTime(rate) {
    this.rateOfTime = rate;
  }

  // Function to subscribe to time updates
  onTimeUpdate(listener) {
    this.on('timeUpdate', listener);
  }
}

export default SimulationTime;
