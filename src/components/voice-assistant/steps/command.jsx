import { useCallback } from "react";
import useVoiceAssistantCommandStep from "../../../hooks/voice-assistant/steps/command";

const VoiceAssistantCommandStep = ({ run, step, onTransition, context }) => {
  const validateParameters = useCallback(
    (command, parameters) => step.validateParameters(command, parameters),
    [step]
  );

  const onCommand = useCallback(
    (command, parameters) => {
      onTransition(step.transition(context, { command, parameters }));
    },
    [step, onTransition, context]
  );

  useVoiceAssistantCommandStep({
    run,
    commands: step.commands,
    validateParameters,
    onCommand,
    questionFormulation: step.questionFormulation,
    commandNotRecognizedErrorFormulation:
      step.commandNotRecognizedErrorFormulation,
  });

  return <></>;
};

export default VoiceAssistantCommandStep;
