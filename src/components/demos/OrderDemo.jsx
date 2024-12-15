import {Button} from "antd";
import {AudioOutlined} from "@ant-design/icons";
import React, { useCallback, useMemo, useState } from "react";
import OrderTaxiVoiceAssistant from "../../lib/voice-assistant/order";
import VoiceAssistant from "../voice-assistant";
import VoiceAssistantStatus from "../voice-assistant/constants/status";
import {useStore} from "../../store/hook";
import {setFormField, confirmForm} from "../../store/actions";

const OrderDemo = () => {
  const [run, setRun] = useState(false);

  const onClick = useCallback(() => setRun(true), []);

  const assistent = useMemo(() => new OrderTaxiVoiceAssistant(), []);

  const { dispatch } = useStore();

  const setPickup = useCallback((pickup) => dispatch(setFormField('pickupLocation', pickup)), [dispatch]);
  const setDropoff = useCallback((dropoff) => dispatch(setFormField('dropoffLocation', dropoff)), [dispatch]);
  const setCarCategory = useCallback((carCategory) => dispatch(setFormField('carType', carCategory)), [dispatch]);
  const setAdditionalServices = useCallback((additionalServices) => dispatch(setFormField('services', additionalServices)), [dispatch]);
  const setConfirmed = useCallback(() => dispatch(confirmForm()), [dispatch]);

  const context = useMemo(
    () => ({ setPickup, setDropoff, setConfirmed, setCarCategory, setAdditionalServices }),
    [setPickup, setDropoff, setConfirmed, setCarCategory, setAdditionalServices]
  );

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
                // window.playDemonstration();
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
      <Button
          type="primary"
          shape="circle"
          icon={<AudioOutlined />}
          onClick={onClick}
      />

  );
};

export default OrderDemo;
