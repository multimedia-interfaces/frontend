import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

const VoiceAssistant = ({ onCommand }) => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!listening && transcript) {
                onCommand(transcript);
                resetTranscript();
            }
        }, 4000);

        return () => clearTimeout(timeout);
    }, [transcript, listening, onCommand, resetTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div style={{ position: 'fixed', top: 10, right: 10 }}>
            <Button
                type="primary"
                shape="circle"
                icon={<AudioOutlined />}
                onClick={ () => SpeechRecognition.startListening({ continuous: true })}
                disabled={listening}
            />
            <Button
                type="danger"
                shape="circle"
                icon={<AudioMutedOutlined />}
                onClick={ () => SpeechRecognition.stopListening()}
                disabled={!listening}
                style={{ marginLeft: 10 }}
            />
        </div>
    );
};

export default VoiceAssistant;