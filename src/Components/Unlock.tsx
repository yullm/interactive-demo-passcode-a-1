import { SequenceStyles, useSequence } from "../Context/SequenceContext";

export const Unlock = () => {

    const Sequence = useSequence();

    return(
        <div style={{
            ...SequenceStyles.center,
            ...SequenceStyles.borderContainer,
            position:'absolute',
            top: Sequence.stage === 1 ? '3.5vh' : '-100vh',
            width:'90vw',
            height:'90vh',
            backgroundColor: Sequence.mazeAComplete ? SequenceStyles.levelThree : SequenceStyles.levelZero,
            borderColor: Sequence.mazeAComplete ? SequenceStyles.levelFour : SequenceStyles.levelOne,
            transition:'top 1s ease, border-color 250ms ease, background-color 250ms ease',
            transitionDelay: Sequence.mazeAComplete ? '750ms' : '0ms',
            zIndex:2,
        }} onClick={()=>{
            
        }}>
            <div style={{
                display:'flex',
                width:'100%',
                height:'100%',
                position:'relative',
                ...SequenceStyles.center,
                color: Sequence.mazeAComplete ? SequenceStyles.levelFour : SequenceStyles.levelOne,                
                transition:'color 250ms ease',
                transitionDelay: Sequence.mazeAComplete ? '750ms' : '0ms',
                fontWeight:800,
                fontSize:'20vh',
            }}>
                UNLOCK
            </div>
        </div>
    )

};