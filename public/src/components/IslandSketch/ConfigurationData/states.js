export const states = {
    SLEEPING: "SLEEPING",
    WAKING: "WAKING",
    SHOWERING: "SHOWERING",
    CHANGING_CLOTHES: "CHANGING_CLOTHES",
    DRINKING_COFFEE: "DRINKING_COFFEE",
    EATING_BREAKFAST: "EATING_BREAKFAST",
    LEAVING_FOR_WORK: "LEAVING_FOR_WORK",
    WALKING_TO_WORK: "WALKING_TO_WORK",
    ARRIVING_AT_WORK: "ARRIVING_AT_WORK",
    WORKING: "WORKING",
    TAKING_BREAK: "TAKING_BREAK",
    LUNCH: "LUNCH",
    GOING_HOME: "GOING_HOME",
    EATING_DINNER: "EATING_DINNER",
    WATCHING_TV: "WATCHING_TV",
    GOING_TO_BED: "GOING_TO_BED",
    TRAVELING: "TRAVELING",  // New consolidated state
  };  

export const stateDetails = {
  SLEEPING: {
    name: states.SLEEPING,
    duration: { default: 480, min: 120, max: 600 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.WAKING,
  },
  TRAVELING: {
    name: states.TRAVELING,
    duration: { default: 15, min: 10, max: 20 },
    moveDetails: { requiresMove: true, isTraveling: true, speedModifier: 1.0 },
    nextState: states.WORKING, // Example of a next state
  },
  WAKING: {
    name: states.WAKING,
    duration: { default: 5, min: 1, max: 10 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.SHOWERING,
  },
  SHOWERING: {
    name: states.SHOWERING,
    duration: { default: 10, min: 5, max: 15 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.CHANGING_CLOTHES,
  },
  CHANGING_CLOTHES: {
    name: states.CHANGING_CLOTHES,
    duration: { default: 5, min: 2, max: 10 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.DRINKING_COFFEE,
  },
  DRINKING_COFFEE: {
    name: states.DRINKING_COFFEE,
    duration: { default: 10, min: 5, max: 15 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.EATING_BREAKFAST,
  },
  EATING_BREAKFAST: {
    name: states.EATING_BREAKFAST,
    duration: { default: 20, min: 10, max: 30 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.LEAVING_FOR_WORK,
  },
  LEAVING_FOR_WORK: {
    name: states.LEAVING_FOR_WORK,
    duration: { default: 5, min: 2, max: 10 },
    moveDetails: { requiresMove: true, isTraveling: true },
    nextState: states.WALKING_TO_WORK,
  },
  WALKING_TO_WORK: {
    name: states.WALKING_TO_WORK,
    duration: { default: 15, min: 10, max: 20 },
    moveDetails: { requiresMove: true, isTraveling: true },
    nextState: states.ARRIVING_AT_WORK,
  },
  ARRIVING_AT_WORK: {
    name: states.ARRIVING_AT_WORK,
    duration: { default: 5, min: 2, max: 10 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.WORKING,
  },
  WORKING: {
    name: states.WORKING,
    duration: { default: 120, min: 60, max: 240 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.TAKING_BREAK, // Can vary based on conditions
  },
  TAKING_BREAK: {
    name: states.TAKING_BREAK,
    duration: { default: 15, min: 5, max: 30 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.WORKING, // After break, back to work
  },
  LUNCH: {
    name: states.LUNCH,
    duration: { default: 30, min: 15, max: 60 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.WORKING, // After lunch, back to work
  },
  GOING_HOME: {
    name: states.GOING_HOME,
    duration: { default: 15, min: 10, max: 20 },
    moveDetails: { requiresMove: true, isTraveling: true },
    nextState: states.EATING_DINNER,
  },
  EATING_DINNER: {
    name: states.EATING_DINNER,
    duration: { default: 30, min: 20, max: 60 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.WATCHING_TV,
  },
  WATCHING_TV: {
    name: states.WATCHING_TV,
    duration: { default: 120, min: 60, max: 180 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.GOING_TO_BED,
  },
  GOING_TO_BED: {
    name: states.GOING_TO_BED,
    duration: { default: 10, min: 5, max: 20 },
    moveDetails: { requiresMove: false, isTraveling: false },
    nextState: states.SLEEPING,
  },
};
