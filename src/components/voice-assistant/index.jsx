import { useState } from "react";
import AbstractVoiceAssistantCommandStep from "../../lib/voice-assistant/abstract/steps/command";
import VoiceAssistantCommandStep from "./steps/command";

const VoiceAssistant = ({ run, assistent, context, onStatusChange }) => {
  const [step, setStep] = useState(assistent.initialize());

  if (step === null) {
    return null;
  }

  switch (true) {
    case step === null:
      return null;

    case step instanceof AbstractVoiceAssistantCommandStep:
      return (
        <VoiceAssistantCommandStep
          run={run}
          step={step}
          onTransition={setStep}
          context={context}
          onStatusChange={onStatusChange}
        />
      );

    default:
      throw new Error(`Cannot render ${step.constructor.name} step`);
  }
};

export default VoiceAssistant;
