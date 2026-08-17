import { useEffect, useRef, useState } from "react";
import { SequenceStyles, useSequence } from "../Context/SequenceContext";
import { useProvence } from "../Provence/ProvenceHooks";

export const Unlock = () => {

    const Sequence = useSequence();
    const Provence = useProvence();

    const [flash, setFlash] = useState(false);

    const flashTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(()=>{
        clearTimeout(flashTimeout.current);
        flash && (flashTimeout.current = setTimeout(()=> setFlash(false), 250));
        flash && Provence.triggerTouchPad?.('A5');
    },[flash]);

    const [canUnlock, setCanUnlock] = useState(false);

    useEffect(()=>{
        (Sequence.mazeAComplete && Sequence.mazeBComplete) ? setCanUnlock(true) : setCanUnlock(false);
    },[Sequence.mazeAComplete,Sequence.mazeBComplete]);

    return(
        <div style={{
            ...SequenceStyles.center,
            ...SequenceStyles.borderContainer,
            position:'absolute',
            top: Sequence.stage === 1 ? '3.5vh' : '-100vh',
            width:'90vw',
            height:'90vh',
            backgroundColor: canUnlock ? SequenceStyles.levelThree : SequenceStyles.levelZero,
            borderColor: canUnlock ? SequenceStyles.levelFour : SequenceStyles.levelOne,
            transition:'top 1s ease, border-color 250ms ease, background-color 250ms ease',
            transitionDelay: canUnlock ? '750ms' : '0ms',
            zIndex:2,
        }} onClick={()=>{
            canUnlock && setFlash(true);
        }}>
            <div style={{
                display:'flex',
                width:'100%',
                height:'100%',
                position:'relative',
                ...SequenceStyles.center,
                color: canUnlock ? SequenceStyles.levelFour : SequenceStyles.levelOne,                
                transition:'color 250ms ease',
                transitionDelay: canUnlock ? '750ms' : '0ms',
                fontWeight:800,
                fontSize:'20vh',
            }}>
                UNLOCK
            </div>
            <div style={{
                position:'absolute',
                width:'100%',
                height:'100%',
                opacity: flash ? 1 : 0,
                backgroundColor:SequenceStyles.levelFour,
                mixBlendMode:'screen',
                transition:'opacity 100ms ease',
            }}></div>
        </div>
    )

};