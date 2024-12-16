import AbstractVoiceAssistantCommandStep from "../../abstract/steps/command";
import NavigationVoiceAssistantNavigateStep from "./navigate";

const Commands = {
    YES: "Yes (*)",
    NO: "No (*)",
};

export default class NavigationVoiceAssistantContinueStep extends AbstractVoiceAssistantCommandStep {
    constructor() {
        super(
            "Anything else?",
            "Please, repeat",
            Object.values(Commands)
        );
    }

    transition({ setRun }, { command }) {
        if (command === Commands.YES) {
            return new NavigationVoiceAssistantNavigateStep();
        }
        setRun(false)
        window.playIdle();
        return null;
    }
}
