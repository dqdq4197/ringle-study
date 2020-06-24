import React,{useEffect,useState, useRef, useCallback} from 'react';
import styled from 'styled-components';
import Script from '../../components/Review/Script';
import Suggestions from '../../components/Review/Suggestions';
import AudioPlayer from '../../components/Review/AudioPlayer';
import {getScriptsThunk, selectScript, changeRange} from '../../store/modules/ReviewScript';
import {getSuggestionsThunk} from '../../store/modules/ReviewSuggestions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/modules/index';
import storage from '../../lib/storage';

type TControllButton = {
    buttonSrc: string[],
    buttonHandler:() => void,
    alt:string,
}

const MainContainer = () => {

    const {dialog, url, seekTime} = useSelector((state:RootState) =>  state.script);
    const isAuto = storage.get('AutoScroll');
    
    const [startTime,setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
    const [isPause, setIsPause] = useState(true);
    const [repeat, setRepeat] = useState(0);  
    const [value, setValue] = useState(0);

 

    const currentRef = useRef<HTMLAudioElement>(null);
    const rangeRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch(getScriptsThunk());
        dispatch(getSuggestionsThunk());
    },[dispatch])
    
    
    const formatTime = (time:number) => {
        let minutes, seconds;
        minutes = Math.floor(time / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(time % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }
    const onAutoScrollHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        storage.set("AutoScroll", event.target.checked);
    }
    const onChangeSeek = (time:number) => {
        dispatch(changeRange(time))
    }

    const onLoadedEndTime = useCallback(() => {
        if(currentRef.current) {
            setEndTime(formatTime(currentRef.current.duration));
        }
    },[])

    const onChangeRange = useCallback((value:string) => {
        if(currentRef.current) {
            setValue(Number(value));
            setStartTime(formatTime(Number(value) * currentRef.current.duration));
        }
    },[])
    const rangeMouseUp = useCallback(() => {
        if(currentRef.current && rangeRef.current){
            currentRef.current.currentTime=Number(rangeRef.current.value) * currentRef.current.duration;
            onChangeSeek(Number(rangeRef.current.value) * currentRef.current.duration);
        }
    },[onChangeSeek])

    const onSelectScript = useCallback((time:number) => {
        dispatch(selectScript(time));
        if(currentRef.current && rangeRef.current){
            currentRef.current.currentTime = time;
            setValue(1/currentRef.current.duration * time);
            setStartTime(formatTime(Number(time)))
        }
    },[dispatch]);
    
    const makeControllButton = ():TControllButton[] => [
        { // 5초 전
            buttonSrc: ["https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-prev-5s.png"],
            buttonHandler: () => {
                if(currentRef.current){
                    currentRef.current.currentTime -= 5;
                    dispatch(changeRange(currentRef.current.currentTime));
                    setStartTime(formatTime(Number(currentRef.current.currentTime)));
                }
            },
            alt:"Prev"
        },
        { // 시작/정지
            buttonSrc: ["https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-play.png",
            "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-pause.png"],
            buttonHandler: () => {
                let audio = currentRef.current;
                if(audio) {
                    if(!isPause) {
                        audio.pause();
                        if(repeat) 
                            clearInterval(repeat)
                        setIsPause(true);
                    } else {
                        audio.play();
                        onChangeSeek(audio.currentTime)
                        setRepeat(setInterval(() => {
                            if(audio){
                                onChangeSeek(audio.currentTime);
                                setValue(1/audio.duration * audio.currentTime)
                                setStartTime(formatTime(Number(audio.currentTime)))
                            }
                        }, 1000));
                        setIsPause(false);
                    }
                }
            },
            alt:"Play"
        },
        { // 5초 후
            buttonSrc: ["https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-next-5s.png"],
            buttonHandler: () => {
                if(currentRef.current){
                    currentRef.current.currentTime += 5;
                    onChangeSeek(currentRef.current.currentTime);
                    setStartTime(formatTime(Number(currentRef.current.currentTime)));
                }
            },
            alt:"Next"
        }
    ]
    return (
        <ScriptContainer>
            <ScriptWrap>
                <Script 
                    dialog={dialog}
                    onSelectScript={onSelectScript}
                    seekTime={seekTime}
                    AutoScrollHandler={onAutoScrollHandler}
                    isAuto={isAuto}
                />
                <Suggestions/>
                <AudioPlayer 
                    currentRef={currentRef} 
                    rangeRef={rangeRef}
                    value={value}
                    url={url}
                    changeRange={onChangeRange}
                    controllButton={makeControllButton()}
                    rangeMouseUp={rangeMouseUp}
                    loadedEndTime={onLoadedEndTime}
                    startTime={startTime}    
                    endTime={endTime}
                    isPause={isPause}
                />
            </ScriptWrap>
        </ScriptContainer>
    )
}


const ScriptContainer = styled.div`
    flex: 1.5 1;
    padding:0 30px;
`
const ScriptWrap = styled.div`
    position:relative;
    display:flex;
    height:100%;
    
`


export default MainContainer;