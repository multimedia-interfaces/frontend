import AbstractVoiceAssistant from "../abstract";
import NavigationVoiceAssistantNavigateStep from "./steps/navigate";

export default class NavigationVoiceAssistant extends AbstractVoiceAssistant {
  initialize() {
    return new NavigationVoiceAssistantNavigateStep();
  }
}
