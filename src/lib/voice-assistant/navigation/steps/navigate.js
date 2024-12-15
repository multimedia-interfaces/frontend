import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";

const Pages = {
  TAXI_ORDER: "TAXI_ORDER",
  PROFILE: "PROFILE",
  RIDES_HISTORY: "RIDES_HISTORY",
};

const Paths = {
  [Pages.TAXI_ORDER]: "/order",
  [Pages.PROFILE]: "/profile",
  [Pages.RIDES_HISTORY]: "/history",
};

const Commands = {
  [Pages.TAXI_ORDER]: [
    "(I) (would like to) book (a) taxi",
    "can I order (a) taxi",
    "(I) need (a) taxi",
  ],
  [Pages.PROFILE]: [
    "(I) (would like to) see my profile",
    "can I take a look on (my) profile",
    "show (me) (my) profile",
  ],
  [Pages.RIDES_HISTORY]: [
    "(I) (would like to) see my (previous) rides",
    "show (me) (my) (previuos) rides",
  ],
};

const CommandToPageMap = Object.fromEntries(
  Object.entries(Commands)
    .map(([page, commands]) => commands.map((command) => [command, page]))
    .flat()
);

export default class NavigationVoiceAssistantNavigateStep extends AbstractVoiceAssistantCommandStep {
  constructor() {
    super(
      "How can I help you?",
      "Sorry, but I didn't understand you. Please, repeat",
      Object.values(Commands)
    );
  }

  transition({ navigate }, { command }) {
    navigate(Paths[CommandToPageMap[command]]);

    return null;
  }
}
