import AbstractVoiceAssistant from "../abstract";
import OrderTaxiVoiceAssistantPickupStep from "./steps/pickup";
import NavigationVoiceAssistantNavigateStep from "../navigation/steps/navigate";

export default class OrderTaxiVoiceAssistant extends AbstractVoiceAssistant {
  initialize() {
    return new NavigationVoiceAssistantNavigateStep();
  }
}
