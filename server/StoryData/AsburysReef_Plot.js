//const characters_data = require('./characters_data.js');
const characters_data = {
  "Ellie Tuppe": {
    description:
      "Ellie Tupe is a 28-year-old marine biologist who has spent her life studying crabs and marine life.",
  },
};

const effect_types = {
  MoveToEventState: 0,
};

const EffectTemplate = {
  effect_id: 0,
  effect_name: "",
  effect_description: "",
  effect_type: effect_types.MoveToEventState,
  parameters: {
    new_event_id: 0,
  },
};

const PlotEventActionTemplate = {
  action_id: 0,
  action_name: "",
  effects: [],
};

const PlotEventTemplate = {
  event_id: 0,
  event_name: "",
  description: "",
  trigger_conditions: [],
  prerequisites: [],
  actions: [],
};

// Example plot template
const PlotTemplate = {
  story_name: "",
  main_character_key: "",
  plot_description: "",
  events: [],
};

// Example plot data for Asbury's Reef Island
const AsburyReef_Plot = {
  story_name: "Asbury's Reef",
  main_character_key: "Ellie Tuppe",
  plot_description:
    "Ellie Tuppe has recently relocated to the Pacific Northwest island of Asbury's Reef, a small fishing community with just over 50 residents. Her move was prompted by an unexpected inheritance: her estranged father's old crab fishing business, which he left to her after his passing. As Ellie settles into island life, she begins to uncover a dark secret lurking beneath the surface. A mysterious and sinister cult operates on the island, with about half the residents secretly counted among its members. She is focused on rebuilding her father's crab fishing business and confronting the cult's sinister plans.",
  events: [
    {
      event_id: 0,
      event_name: "Ellie's Dad's Death",
      description: "Ellie's dad, Aubrey, passed away on August 15th, 2015.",
      action: [
        "Ellie Tuppe and her friends must find a new way to survive.",
        "Ellie must navigate the cult's influence on the island's fishing industry.",
      ],
    },
  ],
};

const EventsTimeLine = {
  history: [
    {
      event_id: 0,
      date: "December 15th, 2023",
      description: "Ellie's dad passed away.",
    },
    {
      event_id: 1,
      date: "December 25th, 2023",
      description: "Ellie Tuppe alerted of her inheritance.",
    },
    {
      event_id: 2,
      date: "December 31st, 2023",
      description: "Ellie Tuppe relocated to Asbury's Reef.",
    },
  ],
  start: {
    event_id: 3,
    date: "December 31st, 2023",
    description: "Ellie Tuppe's arrival at Asbury's Reef.",
    setting: {
      title: "Asbury's Reef Marina Docks",
      description:
        "At the end of the dock having just disembarked the ferry that brought her here, Ellie grabs her suitcase and faces the small island town. She sees a redhead woman only a few years older than herself walking toward her.",
    },
    objectives: [{ objective: "Speak with the Redhead woman on the docks."}],
  },
};
