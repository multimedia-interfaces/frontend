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

  const [status, setStatus] = useState(VoiceAssistantStatus.IDLE);

  return run ? (
    <>
      <VoiceAssistant
        run={run}
        assistent={assistent}
        context={context}
        onStatusChange={setStatus}
      />
      {status}
    </>
  ) : (
    <button onClick={onClick}>Start</button>
  );
};

export default NavigationDemo;
