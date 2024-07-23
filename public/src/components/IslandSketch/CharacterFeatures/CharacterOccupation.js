import CharacterFeature from './CharacterFeature';

class CharacterOccupation extends CharacterFeature {
  constructor(jobTitle, hourlyWage, jobLot, schedule, hours, companyName, jobDescription, requiredSkills, supervisorName = '', performanceRating = 0, promotionEligibility = false, projects = []) {
    super();
    this.setProperty('jobTitle', jobTitle);
    this.setProperty('hourlyWage', hourlyWage);
    this.setProperty('jobLot', jobLot);
    this.setProperty('schedule', schedule);
    this.setProperty('hours', hours);
    this.setProperty('companyName', companyName);
    this.setProperty('jobDescription', jobDescription);
    this.setProperty('requiredSkills', requiredSkills);
    this.setProperty('supervisorName', supervisorName);
    this.setProperty('performanceRating', performanceRating);
    this.setProperty('promotionEligibility', promotionEligibility);
    this.setProperty('projects', projects);
  }

  calculateDailyEarnings() {
    return this.getProperty('hourlyWage') * this.getProperty('hours');
  }

  isWorking(currentTime) {
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    const [startHour, startMinute] = this.getProperty('schedule').start.split(':').map(Number);
    const [endHour, endMinute] = this.getProperty('schedule').end.split(':').map(Number);

    const currentMinutes = currentHour * 60 + currentMinute;
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  checkPromotionEligibility() {
    return this.getProperty('performanceRating') >= 4 && this.getProperty('promotionEligibility');
  }

  assignProject(project) {
    const projects = this.getProperty('projects');
    projects.push(project);
    this.setProperty('projects', projects);
  }

  removeProject(projectName) {
    const projects = this.getProperty('projects').filter(project => project.name !== projectName);
    this.setProperty('projects', projects);
  }

  updatePerformanceRating(newRating) {
    this.setProperty('performanceRating', newRating);
  }

  update() {
    // Add logic to update properties over time if needed
  }
}

export default CharacterOccupation;
