import React, { useEffect, useMemo, useReducer } from "react";
import useSpeechToText from "../hooks/use-speech-to-text";
import useTextToSpeech, { TextToSpeechStatus } from "../hooks/use-text-to-speech";

class Action {}

class InputAction extends Action {}

class TranscriptAction extends Action {
  constructor(transcript) {
    super();
    this.transcript = transcript;
  }
}

class FinishedSpeakingAction extends Action {}

class State {
  on(_action) {
    return this;
  }
}

class WaitingForInputState extends State {
  on(action) {
    if (action instanceof InputAction) {
      return new ListeningState();
    }

    return super.on(action);
  }
}

class ListeningState extends State {
  on(action) {
    if (action instanceof TranscriptAction) {
      return new SpeakingState(action.transcript);
    }

    return super.on(action);
  }
}

class SpeakingState extends State {
  constructor(text) {
    super();

    this.text = text;
  }

  on(action) {
    if (action instanceof FinishedSpeakingAction) {
      return new ListeningState();
    }

    return super.on(action);
  }
}

function reducer(state, action) {
  return state.on(action);
}

const Echo = () => {
  const [state, dispatch] = useReducer(reducer, new WaitingForInputState());
  
  const isSpeaking = state instanceof SpeakingState;
  const { status: ttsStatus } = useTextToSpeech(isSpeaking ? state.text : '', isSpeaking);

  const isListeningState = state instanceof ListeningState;
  const { text } = useSpeechToText(isListeningState);

  useEffect(() => {
    if(isSpeaking && ttsStatus === TextToSpeechStatus.FINISHED) {
      dispatch(new FinishedSpeakingAction())
    }
  }, [isSpeaking, ttsStatus]);

  useEffect(() => {
    if(isListeningState && typeof text === 'string') {
      dispatch(new TranscriptAction(text))
    }
  }, [isListeningState, text]);

  const onClick = useMemo(() => () => dispatch(new InputAction()), [dispatch]);

  switch (true) {
    case state instanceof WaitingForInputState: {
      return (
        <div>
          <button onClick={onClick}>Start</button>
        </div>
      );
    }
    case state instanceof SpeakingState: {
      return <div>Speaking</div>;
    }
    case state instanceof ListeningState: {
      return <div>Listening</div>;
    }
    default: {
      console.dir({ state });
      throw new Error(`Unknown state ${state.constructor.name}`);
    }
  }
};
export default Echo;
