import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const SpeechToTextStatus = {
  NOT_LISTENING: "NOT_LISTENING",
  LISTENING: "LISTENING",
  FINISHED: "FINISHED",
};

/**
 * @param {boolean} listen Whether speech should be transcribed or not
 */
export default function useSpeechToText(listen) {
  const [status, setStatus] = useState(SpeechToTextStatus.NOT_LISTENING);
  const [text, setText] = useState();

  const { finalTranscript, listening, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    switch (true) {
      case !listen && status !== SpeechToTextStatus.NOT_LISTENING:
        setStatus(SpeechToTextStatus.NOT_LISTENING);
        setText();
        break;
      case listen && status === SpeechToTextStatus.NOT_LISTENING:
        setStatus(SpeechToTextStatus.LISTENING);
        break;
      default:
        break;
    }
  }, [listen, status]);

  useEffect(() => {
    if (status !== SpeechToTextStatus.LISTENING) {
      if (listening) {
        SpeechRecognition.stopListening();
        resetTranscript();
      }

      return;
    }

    if (!listening) {
      if (finalTranscript !== "") {
        resetTranscript();
        setStatus(SpeechToTextStatus.FINISHED);
        setText(finalTranscript);
      } else {
        SpeechRecognition.startListening();
      }
    }
  }, [status, listening, finalTranscript, resetTranscript]);

  return [status, text];
}
