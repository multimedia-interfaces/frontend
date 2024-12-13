import { useEffect, useState } from "react";
import useEnUsVoiceURI from "./use-en-us-voice";
import { useSpeech } from "react-text-to-speech";

export const TextToSpeechStatus = {
  PREPARING: "PREPARING",
  READY: "READY",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
};

/**
 * @param {string} text Text to pronounce
 * @param {boolean} play Whether text should be pronounced or not
 */
export default function useTextToSpeech(text, play) {
  const [status, setStatus] = useState(TextToSpeechStatus.PREPARING);

  const [currentText, setCurrentText] = useState(text);
  const isTextUpdated = text !== currentText;

  useEffect(() => {
    if (isTextUpdated) {
      setCurrentText(text);
      setStatus(TextToSpeechStatus.PREPARING);
    }
  }, [text, isTextUpdated]);

  const { lang, voiceURI } = useEnUsVoiceURI();
  const isVoiceReady = typeof voiceURI === "string";

  useEffect(() => {
    if (status === TextToSpeechStatus.PREPARING) {
      if (isVoiceReady) {
        setStatus(TextToSpeechStatus.READY);
      }
    }
  }, [status, isVoiceReady]);

  const { speechStatus, start } = useSpeech({
    text,
    lang,
    voiceURI,
  });

  useEffect(() => {
    if (speechStatus === "stopped") {
      if (status === TextToSpeechStatus.READY && play) {
        start();
      } else if (status === TextToSpeechStatus.IN_PROGRESS) {
        setStatus(TextToSpeechStatus.FINISHED);
      }
    } else if (speechStatus === "started") {
      if (status === TextToSpeechStatus.READY) {
        setStatus(TextToSpeechStatus.IN_PROGRESS);
      }
    }
  }, [status, play, speechStatus, start]);

  return [status];
}
