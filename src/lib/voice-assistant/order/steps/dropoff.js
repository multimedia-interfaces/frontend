import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantConfirmationStep from "./confirmation";

export default class OrderTaxiVoiceAssistantDropoffStep extends AbstractVoiceAssistantCommandStep {
  constructor(fromRepeat) {
    super(
      "Where will we go?",
      "Can you repeat please?",
      ["To (the) *", "Drop (me) off near (the)*", "Drop (me) off at *", "At (the) *", "Near (the) *"]
    );

    this.fromConfirmation = fromRepeat;
  }

  transition({ setDropoff }, { parameters: [dropoff] }) {
    setDropoff(dropoff);

    return this.fromConfirmation
      ? new OrderTaxiVoiceAssistantConfirmationStep()
      // TODO change to next steps
      : new OrderTaxiVoiceAssistantConfirmationStep();
  }
}
