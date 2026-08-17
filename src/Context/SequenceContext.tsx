import { createContext, CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { Container } from "../Components/Container";
import { useProvence } from "../Provence/ProvenceHooks";

const SequenceContext = createContext<{
    stage:number,
    passcodeAnswer:string[],
    passcodeInput:string[],
    onPasscodeInput?:(value:string)=>void,
    mazeAComplete:boolean,
    mazeBComplete:boolean,
}>({
    stage:0,
    passcodeAnswer:['4','5','1','2'],
    passcodeInput:[],
    mazeAComplete:false,
    mazeBComplete:false,
});

export const useSequence = () => useContext(SequenceContext);

export const SequenceProvider = () => {

    const Provence = useProvence();

    const [stage, setStage] = useState(0);
    const [passcodeAnswer, setPasscodeAnswer] = useState<string[]>(['4','5','1','2']);
    const [passcodeInput, setPasscodeInput] = useState<string[]>([]);

    const onPasscodeInput = (value:string) => {
        if(stage !== 0) return;
        let newInput = [...passcodeInput];
        if(passcodeInput.length < 4){
            newInput.push(value);
        }else{
            newInput = [value];
        }
        //setPasscodeInput(newInput);
        Provence.triggerTouchPad?.('passcode-a-passcode-input',{input:newInput});
    };
    
    const eraseTimeout = useRef<ReturnType<typeof setInterval>>(undefined);

    useEffect(()=>{
        clearTimeout(eraseTimeout.current);
        if(passcodeInput.length === 4){
            let valid = true;
            for(let i = 0; i < 4; i++){
                valid = passcodeAnswer[i] === passcodeInput[i];
                if(!valid) break;
            }
            if(valid){
                Provence.triggerTouchPad?.('passcode-a-passcode-set-stage',{stage:1});
            }else{
                eraseTimeout.current = setTimeout(()=>{
                    Provence.triggerTouchPad?.('passcode-a-passcode-input',{input:[]});
                },500);
            }
        }
    },[passcodeInput]);

    const handleRemoteInput = (buttonID:string, args:{input:string[]}) => {
        setPasscodeInput(args.input);
    };

    const handleSetStage = (buttonID:string, args:{stage:number}) => {
        setStage(args.stage);
    };

    const [mazeAComplete, setMazeAComplete] = useState(false);

    const handleMazeAEvents = (buttonID:string, args:{complete:boolean}) => {
        setMazeAComplete(args.complete);
    };

    const [mazeBComplete, setMazeBComplete] = useState(false);

    const handleMazeBEvents = (buttonID:string, args:{complete:boolean}) => {
        setMazeAComplete(args.complete);
    };

    const handleReset = () => {
        setPasscodeInput([]);
        setMazeAComplete(false);
        setMazeBComplete(false);
        setStage(0);
    };

    useEffect(()=>{
        Provence.registerTouchPadListener?.('passcode-a-passcode-input', handleRemoteInput);
        Provence.registerTouchPadListener?.('passcode-a-passcode-set-stage', handleSetStage);
        Provence.registerTouchPadListener?.('passcode-a-maze-a',handleMazeAEvents);        
        Provence.registerTouchPadListener?.('passcode-a-maze-b',handleMazeBEvents);
        Provence.registerTouchPadListener?.('reset', handleReset);
        return(()=>{
            Provence.unregisterTouchPadListener?.('passcode-a-passcode-input', handleRemoteInput);            
            Provence.unregisterTouchPadListener?.('passcode-a-passcode-set-stage', handleSetStage);
            Provence.unregisterTouchPadListener?.('passcode-a-maze-a',handleMazeAEvents);
            Provence.unregisterTouchPadListener?.('passcode-a-maze-b',handleMazeBEvents);
            Provence.unregisterTouchPadListener?.('reset', handleReset);
        });
    },[]);

    return(
        <SequenceContext.Provider value={{
            stage:stage,
            passcodeInput:passcodeInput,
            passcodeAnswer:passcodeAnswer,
            mazeAComplete:mazeAComplete,
            mazeBComplete:mazeBComplete,
            onPasscodeInput:onPasscodeInput,
        }}>
            <Container></Container>
        </SequenceContext.Provider>
    );

};

export const SequenceStyles = {
    levelZero: "#46334F",
    levelOne: '#8082a6',
    levelTwo: '#f24f13',
    levelThree: '#f2921D',
    levelFour:'#F2C230',
    center:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    } as CSSProperties,
    borderContainer:{
        borderRadius:'1vw',
        borderStyle:'solid',
        borderWidth:'1vw',
        borderColor:'#f24f13',
    } as CSSProperties,
};