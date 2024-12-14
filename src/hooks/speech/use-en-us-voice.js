import { useEffect, useState } from "react";
import { useVoices } from "react-text-to-speech";

const lang = "en-US";

export default function useEnUsVoiceURI() {
  const { voices } = useVoices();
  const [voiceURI, setVoiceURI] = useState();

  useEffect(() => {
    const voiceURI = voices.find((voice) => voice.lang === lang)?.voiceURI;

    if (typeof voiceURI === "string") {
      setVoiceURI(voiceURI);
    }
  }, [voices]);

  return { lang, voiceURI };
}
