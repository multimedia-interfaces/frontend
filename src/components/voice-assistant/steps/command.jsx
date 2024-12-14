import { useCallback, useEffect } from "react";
import useVoiceAssistantCommandStep, {
  VoiceAssistantCommandStepStatus,
} from "../../../hooks/voice-assistant/steps/command";
import VoiceAssistantStatus from "../constants/status";

const VoiceAssistantCommandStep = ({
  run,
  step,
  onTransition,
  context,
  onStatusChange,
}) => {
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

  const [status] = useVoiceAssistantCommandStep({
    run,
    commands: step.commands,
    validateParameters,
    onCommand,
    questionFormulation: step.questionFormulation,
    commandNotRecognizedErrorFormulation:
      step.commandNotRecognizedErrorFormulation,
  });

  useEffect(() => {
    switch (status) {
      case VoiceAssistantCommandStepStatus.ASKING_QUESTION:
      case VoiceAssistantCommandStepStatus.DESCRIBING_ERROR:
        onStatusChange(VoiceAssistantStatus.SPEAKING);
        break;
      case VoiceAssistantCommandStepStatus.LISTENING:
        onStatusChange(VoiceAssistantStatus.LISTENING);
        break;
      default:
        onStatusChange(VoiceAssistantStatus.IDLE);
        break;
    }
  }, [status, onStatusChange]);

  return <></>;
};

export default VoiceAssistantCommandStep;
