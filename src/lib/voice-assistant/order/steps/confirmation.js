import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantRepeatStep from "./repeat";
import NavigationVoiceAssistantContinueStep from "../../navigation/steps/continue";

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
      window.isMaskotDemonstration = true;
      return new NavigationVoiceAssistantContinueStep();
    }

    return new OrderTaxiVoiceAssistantRepeatStep();
  }
}
