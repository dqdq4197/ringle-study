import React,{useEffect,useState, useRef, useCallback, useMemo} from 'react';
import Script from '../../components/Review/Script';
import Suggestions from '../../components/Review/Suggestions';
import Feedback from '../../components/Review/Feedback';
import Graph from '../../components/Review/Graph';
import AudioPlayer from '../../components/Review/AudioPlayer';
import {getScriptsThunk} from '../../modules/ReviewScript';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules/index';

const MainContainer = () => {
    const {dialog, url} = useSelector((state:RootState) =>  state.script);
    const dispatch = useDispatch();
    const currentRef = useRef<HTMLAudioElement>()

    useEffect(() => {
        dispatch(getScriptsThunk());
    },[])

    
    return (
        <>
            <div style={{flex:"1.5 1", paddingLeft:"30px", paddingRight:"30px"}}>
                <div style={{position:"relative", display:"flex", height:"100%"}}>
                    <Script 
                        dialog={dialog} 
                        currentRef={currentRef}
                    />
                    <Suggestions/>
                    <AudioPlayer 
                        currentRef={currentRef} 
                        url={url}

                    />
                </div>
            </div>
            <div style={{width: "1px", height: "100%", backgroundColor: "#f3f3f3"}}/>
            <div style={{flex:"1 1"}}>
                <Feedback/>
                <Graph/>
            </div>
        </>
    )
}

export default MainContainer;