import { useCallback, useMemo, useState } from "react";
import NavigationVoiceAssistant from "../../lib/voice-assistant/navigation";
import VoiceAssistant from "../voice-assistant";
import { useNavigate } from "react-router-dom";

const NavigationDemo = () => {
  const [run, setRun] = useState(false);

  const onClick = useCallback(() => setRun(true), []);

  const assistent = useMemo(() => new NavigationVoiceAssistant(), []);

  const navigate = useNavigate();

  const context = useMemo(() => ({ navigate }), [navigate]);

  return run ? (
    <VoiceAssistant run={run} assistent={assistent} context={context} />
  ) : (
    <button onClick={onClick}>Start</button>
  );
};

export default NavigationDemo;
