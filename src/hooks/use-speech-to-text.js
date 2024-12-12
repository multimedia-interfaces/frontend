import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

/**
 * @param {boolean} listen Whether speech should be transcribed or not
 */
export default function useSpeechToText(listen) {
  const [text, setText] = useState();

  const { finalTranscript, listening, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    if (!listen) {
      if (listening) {
        SpeechRecognition.stopListening();
        resetTranscript();
        setText();
      }

      return;
    }

    if (!listening) {
      if (finalTranscript !== "") {
        resetTranscript();
        setText(finalTranscript);
      } else {
        SpeechRecognition.startListening();
      }
    }
  }, [listen, listening, finalTranscript, resetTranscript]);

  return { text, listening };
}
