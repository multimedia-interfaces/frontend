import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantDropoffStep from "./dropoff";
import OrderTaxiVoiceAssistantPickupStep from "./pickup";

const Fields = {
  PICKUP: "Pick up",
  DROPOFF: "Drop off",
};

const Commands = {
  [Fields.PICKUP]: ["Pick up (*)", "Starting (*)"],
  [Fields.DROPOFF]: ["Drop off (*)", "Destination (*)"],
};

const CommandToFieldMap = Object.fromEntries(
  Object.entries(Commands)
    .map(([field, commands]) => commands.map((command) => [command, field]))
    .flat()
);

export default class OrderTaxiVoiceAssistantRepeatStep extends AbstractVoiceAssistantCommandStep {
  constructor() {
    super(
      "What should be corrected?",
      "Please, name a field",
      Object.values(Commands)
    );
  }

  transition(context, { command }) {
    const field = CommandToFieldMap[command];

    switch (field) {
      case Fields.PICKUP:
        return new OrderTaxiVoiceAssistantPickupStep(true);
      case Fields.DROPOFF:
        return new OrderTaxiVoiceAssistantDropoffStep(true);
      default:
        break;
    }

    return null;
  }
}
