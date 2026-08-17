import { useEffect, useState } from "react";
import { SequenceStyles, useSequence } from "../Context/SequenceContext";
import { PasscodeDisplay } from "./PasscodeDisplay";
import { PasscodeEntry } from "./PasscodeEntry";
import { ProvenceHook, useProvence } from "../Provence/ProvenceHooks";
import { Unlock } from "./Unlock";

export const Container = () => {

    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            width:'100vw',
            maxWidth:'100vw',
            height:'100vh',
            maxHeight:'100vh',
            justifyContent:'center',
            alignItems:'center',
            overflow:'hidden',
            backgroundColor:SequenceStyles.levelZero,
            userSelect:'none',
        }}>
            <Unlock></Unlock>
            <PasscodeDisplay></PasscodeDisplay>
            <PasscodeEntry></PasscodeEntry>
        </div>
    );

};