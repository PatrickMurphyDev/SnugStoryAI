const z = require('zod');

const StoryDetails = z.object({
    victimName: z.string(),
    timeOfDeath: z.string(),
    locationFound: z.string(),
    murderWeapon: z.string(),
    causeOfDeath: z.string(),
    crimeSceneDetails: z.array(z.string()),
    witnesses: z.array(z.string()),
    initialClues: z.array(z.string()),
    npcBrief: z.string()
});

module.exports = {
    StoryDetails
};