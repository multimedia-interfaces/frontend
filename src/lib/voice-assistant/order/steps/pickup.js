import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import OrderTaxiVoiceAssistantConfirmationStep from "./confirmation";
import OrderTaxiVoiceAssistantDropoffStep from "./dropoff";

export default class OrderTaxiVoiceAssistantPickupStep extends AbstractVoiceAssistantCommandStep {
  constructor(fromRepeat) {
    super(
      "Where should we pick you up?",
      "I didn't understand you",
      [
        "(I'm) near *",
        "(I'm) at *",
        "Pick me (up) at *",
        "Pick me (up) near *",
      ]
    );

    this.fromConfirmation = fromRepeat;
  }

  transition({ setPickup }, { parameters: [pickup] }) {
    setPickup(pickup);

    return this.fromConfirmation
      ? new OrderTaxiVoiceAssistantConfirmationStep()
      : new OrderTaxiVoiceAssistantDropoffStep();
  }
}
