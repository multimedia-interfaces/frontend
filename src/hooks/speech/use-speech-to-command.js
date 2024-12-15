import { useEffect, useMemo, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const SpeechToCommandStatus = {
  NOT_LISTENING: "NOT_LISTENING",
  LISTENING: "LISTENING",
  FINISHED: "FINISHED",
  NOT_RECOGNIZED: "NOT_RECOGNIZED",
};

/**
 * @param {boolean} listen Whether speech should be transcribed or not
 */
export default function useSpeechToCommand(commands, listen) {
  const [status, setStatus] = useState(SpeechToCommandStatus.NOT_LISTENING);
  const [result, setResult] = useState();

  const speechRecognitionCommands = useMemo(
    () =>
      commands.map((command) => ({
        command,
        callback: (...args) => {
          setStatus(SpeechToCommandStatus.FINISHED);
          setResult({ command: args[args.length - 1].command, parameters: args.slice(0, -1) });
        },
      })),
    [commands]
  );

  const { finalTranscript, listening, resetTranscript } = useSpeechRecognition({
    commands: speechRecognitionCommands,
  });

  useEffect(() => {
    switch (true) {
      case !listen && status !== SpeechToCommandStatus.NOT_LISTENING:
        setStatus(SpeechToCommandStatus.NOT_LISTENING);
        setResult();
        break;
      case listen && status === SpeechToCommandStatus.NOT_LISTENING:
        setStatus(SpeechToCommandStatus.LISTENING);
        break;
      default:
        break;
    }
  }, [listen, status]);

  useEffect(() => {
    if (status !== SpeechToCommandStatus.LISTENING) {
      if (listening) {
        SpeechRecognition.stopListening();
        resetTranscript();
      }

      return;
    }

    if (!listening) {
      if (finalTranscript !== "") {
        resetTranscript();
        setStatus(SpeechToCommandStatus.NOT_RECOGNIZED);
      } else {
        SpeechRecognition.startListening();
      }
    }
  }, [status, listening, finalTranscript, resetTranscript]);

  return [status, result];
}
