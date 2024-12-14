import AbstractVoiceAssistant from "../abstract";
import OrderTaxiVoiceAssistantPickupStep from "./steps/pickup";

export default class OrderTaxiVoiceAssistant extends AbstractVoiceAssistant {
  initialize() {
    return new OrderTaxiVoiceAssistantPickupStep();
  }
}
