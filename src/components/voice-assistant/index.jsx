import { useEffect, useState } from "react";
import AbstractVoiceAssistantCommandStep from "../../lib/voice-assistant/abstract/steps/command";
import VoiceAssistantCommandStep from "./steps/command";
import VoiceAssistantStatus from "./constants/status";

const VoiceAssistant = ({ run, assistent, context, onStatusChange }) => {
  const [step, setStep] = useState(assistent.initialize());

  useEffect(() => {
    if (step === null) {
      onStatusChange(VoiceAssistantStatus.IDLE);
    }
  }, [step, onStatusChange]);

  switch (true) {
    case step === null:
      return null;

    case step instanceof AbstractVoiceAssistantCommandStep:
      return (
        <VoiceAssistantCommandStep
          key={step.id}
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
