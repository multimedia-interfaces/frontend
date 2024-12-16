import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Mascot() {
    const { scene, animations } = useGLTF('./mascot_v.1.2.glb');
    const mixer = useRef();
    const actions = useRef({});

    useEffect(() => {
        mixer.current = new THREE.AnimationMixer(scene);

        // Налаштування анімацій
        animations.forEach((clip) => {
            actions.current[clip.name] = mixer.current.clipAction(clip);
        });

        // Додаємо функції до глобального об'єкта для тестування
        window.playIdle = playIdle;
        window.playLisening = playLisening;
        window.playSpeaking = playSpeaking;
        window.playDemonstration = playDemonstration;

        playIdle(); // Запуск Idle за замовчуванням

        return () => mixer.current.stopAllAction();
    }, [animations, scene]);

    useFrame((state, delta) => mixer.current?.update(delta));

    const stopAllActions = () => {
        Object.values(actions.current).forEach((action) => action.stop());
    };

    const fadeToAction = (fromAction, toAction, duration = 0.5) => {
        if (fromAction && toAction) {
            fromAction.crossFadeTo(toAction, duration, true);
            toAction.reset().play();
        } else if (toAction) {
            toAction.reset().play();
        }
    };

    const playIdle = () => {
        const currentAction = Object.values(actions.current).find((action) => action.isRunning());
        const idleAction = actions.current['Idle'];
        fadeToAction(currentAction, idleAction);
    };

    const playLisening = () => {
        stopAllActions();
        const liseningAction = actions.current['Lisening'];
        liseningAction?.reset().play();
        liseningAction?.setLoop(THREE.LoopRepeat);
    };

    const playSpeaking = () => {
        const currentAction = Object.values(actions.current).find((action) => action.isRunning());
        const speakingAction = actions.current['Speaking'];
        fadeToAction(currentAction, speakingAction);
        speakingAction?.setLoop(THREE.LoopRepeat);
    };

    const playDemonstration = () => {
        stopAllActions();
        const demonstrationLoopAction = actions.current['Demonstration_loop'];
        demonstrationLoopAction?.reset().play();
        demonstrationLoopAction?.setLoop(THREE.LoopRepeat);
    };

    return <primitive object={scene} />;
}

export default function App() {
    return (
        <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7.5]} intensity={1.0} />
            <pointLight position={[-10, 10, 10]} intensity={0.8} />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1.2} castShadow />
            <Mascot />
            <OrbitControls />
        </Canvas>
    );
}
