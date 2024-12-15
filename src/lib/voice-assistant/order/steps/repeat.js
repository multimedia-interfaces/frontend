import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantDropoffStep from "./dropoff";
import OrderTaxiVoiceAssistantAdditionalServicesStep from "./additionalServices";
import OrderTaxiVoiceAssistantCarCategoryStep from "./car_category";
import OrderTaxiVoiceAssistantPickupStep from "./pickup";

const Fields = {
  PICKUP: "Pick up",
  DROPOFF: "Drop off",
  CAR_CATEGORY: "Car Category",
  ADDITIONAL_SERVICES: "Additional Services",
};

const Commands = {
  [Fields.PICKUP]: ["Pick up (*)", "Starting (*)"],
  [Fields.DROPOFF]: ["Drop off (*)", "Destination (*)"],
  [Fields.CAR_CATEGORY]: ["category (*)"],
  [Fields.ADDITIONAL_SERVICES]: ["Additional Services (*)", "pet (*)", "child (*)"],
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
      case Fields.CAR_CATEGORY:
        return new OrderTaxiVoiceAssistantCarCategoryStep(true);
      case Fields.ADDITIONAL_SERVICES:
        return new OrderTaxiVoiceAssistantAdditionalServicesStep(true);
      default:
        break;
    }

    return null;
  }
}
