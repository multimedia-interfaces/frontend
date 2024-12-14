import React, { useEffect, useMemo, useReducer } from "react";
import useSpeechToCommand, { SpeechToCommandStatus } from "../../hooks/speech/use-speech-to-command";
import useTextToSpeech, { TextToSpeechStatus } from "../../hooks/speech/use-text-to-speech";

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

const EchoDemo = () => {
  const [state, dispatch] = useReducer(reducer, new WaitingForInputState());
  
  const commands = useMemo(() => (['simple', 'with :a :b']), [])

  const isSpeaking = state instanceof SpeakingState;
  const [ ttsStatus ] = useTextToSpeech(isSpeaking ? `${state.text.command} ${state.text.parameters.join(' ')}` : '', isSpeaking);

  const isListeningState = state instanceof ListeningState;
  const [stcStatus, command] = useSpeechToCommand(commands, isListeningState);

  useEffect(() => {
    if(isSpeaking && ttsStatus === TextToSpeechStatus.FINISHED) {
      dispatch(new FinishedSpeakingAction())
    }
  }, [isSpeaking, ttsStatus]);

  useEffect(() => {
    if(isListeningState) {
      if(stcStatus === SpeechToCommandStatus.NOT_RECOGNIZED) {
        dispatch(new TranscriptAction({command: 'not recognized', parameters: []}))
      } else if(typeof command === 'object' && command !== null) {
        dispatch(new TranscriptAction(command))
      }
    }

    
  }, [isListeningState, command, stcStatus]);

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
export default EchoDemo;
