import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantRepeatStep from "./repeat";

const Commands = {
  YES: "Yes (*)",
  NO: "No (*)",
};

export default class OrderTaxiVoiceAssistantConfirmationStep extends AbstractVoiceAssistantCommandStep {
  constructor() {
    super(
      "Please, check the information. Is everything is ok?",
      "Please, repeat",
      Object.values(Commands)
    );
  }

  transition({ setConfirmed }, { command }) {
    if (command === Commands.YES) {
      setConfirmed(true);
      return null;
    }

    return new OrderTaxiVoiceAssistantRepeatStep();
  }
}
