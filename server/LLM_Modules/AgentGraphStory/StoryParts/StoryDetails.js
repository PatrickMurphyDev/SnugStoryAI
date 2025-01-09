// A Class to define the Game Story and allow for Structured Output
export class StoryDetails {
    /**
     * @param {string} victimName - Name of the murder victim
     * @param {string} timeOfDeath - Approximate time when the murder occurred
     * @param {string} locationFound - Where the body was discovered
     * @param {string} murderWeapon - The weapon or method used in the murder
     * @param {string} causeOfDeath - Specific medical cause of death
     * @param {string} crimeSceneDetails - Description of the crime scene and any relevant evidence found
     * @param {string} witnesses - Information about potential witnesses or last known sightings
     * @param {string} initialClues - Initial clues or evidence found at the scene
     * @param {string} npcBrief - Brief description of the characters and their relationships
     */
    constructor(
        victimName,
        timeOfDeath,
        locationFound,
        murderWeapon,
        causeOfDeath,
        crimeSceneDetails,
        witnesses,
        initialClues,
        npcBrief
    ) {
        this.victimName = victimName;
        this.timeOfDeath = timeOfDeath;
        this.locationFound = locationFound;
        this.murderWeapon = murderWeapon;
        this.causeOfDeath = causeOfDeath;
        this.crimeSceneDetails = crimeSceneDetails;
        this.witnesses = witnesses;
        this.initialClues = initialClues;
        this.npcBrief = npcBrief;
    }
}
