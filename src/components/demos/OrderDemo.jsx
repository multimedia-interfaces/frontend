import { useCallback, useMemo, useState } from "react";
import OrderTaxiVoiceAssistant from "../../lib/voice-assistant/order";
import VoiceAssistant from "../voice-assistant";
import VoiceAssistantStatus from "../voice-assistant/constants/status";

const OrderDemo = () => {
  const [run, setRun] = useState(false);

  const onClick = useCallback(() => setRun(true), []);

  const assistent = useMemo(() => new OrderTaxiVoiceAssistant(), []);

  const [pickup, setPickup] = useState();
  const [dropoff, setDropoff] = useState();
  const [confirmed, setConfirmed] = useState();

  const context = useMemo(
    () => ({ setPickup, setDropoff, setConfirmed }),
    [setPickup, setDropoff, setConfirmed]
  );

  const [status, setStatus] = useState(VoiceAssistantStatus.IDLE);

  return run ? (
    <>
      <VoiceAssistant
        run={run}
        assistent={assistent}
        context={context}
        onStatusChange={setStatus}
      />
      <p>Status: {status}</p>
      <p>Pickup: {pickup}</p>
      <p>Destination: {dropoff}</p>
      <p>Confirmed: {confirmed ? "Yes" : "No"}</p>
    </>
  ) : (
    <button onClick={onClick}>Start</button>
  );
};

export default OrderDemo;
