import { useCallback, useEffect, useState } from "react";
import useTextToSpeech, {
  TextToSpeechStatus,
} from "../../speech/use-text-to-speech";
import useSpeechToCommand, {
  SpeechToCommandStatus,
} from "../../speech/use-speech-to-command";

export const VoiceAssistantCommandStepStatus = {
  INITIAL: "INITIAL",
  ASKING_QUESTION: "ASKING_QUESTION",
  LISTENING: "LISTENING",
  DONE: "DONE",
  DESCRIBING_ERROR: "DESCRIBING_ERROR",
};

export class ParametersValidationError extends Error {}

const useVoiceAssistantCommandStep = ({
  run,
  commands,
  validateParameters,
  onCommand,
  questionFormulation,
  commandNotRecognizedErrorFormulation,
}) => {
  const [status, setStatus] = useState(
    run
      ? VoiceAssistantCommandStepStatus.ASKING_QUESTION
      : VoiceAssistantCommandStepStatus.INITIAL
  );

  useEffect(() => {
    if (!run && status !== VoiceAssistantCommandStepStatus.INITIAL) {
      setStatus(VoiceAssistantCommandStepStatus.INITIAL);
    }
  }, [run, status]);

  const isAskingQuestionState =
    status === VoiceAssistantCommandStepStatus.ASKING_QUESTION;
  const [askingQuestionStatus] = useTextToSpeech(
    questionFormulation,
    isAskingQuestionState
  );

  useEffect(() => {
    if (
      isAskingQuestionState &&
      askingQuestionStatus === TextToSpeechStatus.FINISHED
    ) {
      setStatus(VoiceAssistantCommandStepStatus.LISTENING);
    }
  }, [isAskingQuestionState, askingQuestionStatus]);

  useTextToSpeech();

  const isErrorDescribingState =
    status === VoiceAssistantCommandStepStatus.DESCRIBING_ERROR;
  const [errorFormulation, setErrorFormulation] = useState();

  const [errorDescribingStatus] = useTextToSpeech(
    errorFormulation,
    isErrorDescribingState
  );

  useEffect(() => {
    if (
      isErrorDescribingState &&
      errorDescribingStatus === TextToSpeechStatus.FINISHED
    ) {
      setStatus(VoiceAssistantCommandStepStatus.LISTENING);
      setErrorFormulation();
    }
  }, [isErrorDescribingState, errorDescribingStatus]);

  const isListeningState = status === VoiceAssistantCommandStepStatus.LISTENING;
  const [listeningState, result] = useSpeechToCommand(
    commands,
    isListeningState
  );

  const handleCommand = useCallback(
    (command, parameters) => {
      try {
        validateParameters?.(command, parameters);
      } catch (error) {
        if (error instanceof ParametersValidationError) {
          setStatus(VoiceAssistantCommandStepStatus.DESCRIBING_ERROR);
          setErrorFormulation(error.message);
          return;
        }

        throw error;
      }

      setStatus(VoiceAssistantCommandStepStatus.DONE);
      onCommand(command, parameters);
    },
    [validateParameters, onCommand]
  );

  useEffect(() => {
    if (isListeningState) {
      switch (listeningState) {
        case SpeechToCommandStatus.FINISHED:
          if (result !== undefined) {
            handleCommand(result.command, result.parameters);
          }
          break;
        case SpeechToCommandStatus.NOT_RECOGNIZED:
          setStatus(VoiceAssistantCommandStepStatus.DESCRIBING_ERROR);
          setErrorFormulation(commandNotRecognizedErrorFormulation);
          break;
        default:
          break;
      }
    }
  }, [
    isListeningState,
    listeningState,
    result,
    handleCommand,
    commandNotRecognizedErrorFormulation,
  ]);

  return [status];
};

export default useVoiceAssistantCommandStep;
