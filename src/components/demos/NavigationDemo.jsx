import {useCallback, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import NavigationVoiceAssistant from "../../lib/voice-assistant/navigation";
import VoiceAssistant from "../voice-assistant";
import VoiceAssistantStatus from "../voice-assistant/constants/status";

const NavigationDemo = () => {
  const [run, setRun] = useState(false);

  const onClick = useCallback(() => setRun(true), []);

  const assistent = useMemo(() => new NavigationVoiceAssistant(), []);

  const navigate = useNavigate();
  const context = useMemo(() => ({ navigate }), [navigate]);


  const handleStatusChange = (status) => {
    switch (status) {
      case VoiceAssistantStatus.SPEAKING:
        window.playSpeaking();
        break;
      case VoiceAssistantStatus.LISTENING:
        window.playLisening();
        break;
      case VoiceAssistantStatus.IDLE:
        window.playIdle();
        break;
      default:
        break;
    }
  };

  return run ? (
      <VoiceAssistant
        run={run}
        assistent={assistent}
        context={context}
        onStatusChange={handleStatusChange}
      />
  ) : (
    <button onClick={onClick}>Start</button>
  );
};

export default NavigationDemo;
