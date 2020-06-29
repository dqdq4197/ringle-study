import React,{useEffect,useState, useRef, useCallback} from 'react';
import styled from 'styled-components';
import Scripts from '../../components/Review/Scripts';
import Suggestions from '../../components/Review/Suggestions';
import AudioPlayer from '../../components/Review/AudioPlayer';
import {getScriptsThunk, selectScript, changeRange} from '../../store/modules/ReviewScript';
import {getSuggestionsThunk} from '../../store/modules/ReviewSuggestions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/modules/index';

type TControllButton = {
    buttonSrc: string[],
    buttonHandler:() => void,
    alt:string,
}

const ReviewMainContainer = () => {

    const {scripts, url, audioCurrentTime} = useSelector((state:RootState) =>  state.script);
    const dispatch = useDispatch();

    const [startTime,setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
    const [isPause, setIsPause] = useState(true);
    const [isRepeat, setIsRepeat] = useState(0);  
    const [value, setValue] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const rangeInputRef = useRef<HTMLInputElement>(null);

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

    const UpdateAudioCurrentTime = (time:number) => {
        dispatch(changeRange(time))
    }

    const handleScriptClick = useCallback((time:number) => {
        dispatch(selectScript(time));
        if(audioRef.current){
            audioRef.current.currentTime = time;
            setValue(1/audioRef.current.duration * time);
            setStartTime(formatTime(Number(time)))
        }
    },[dispatch]);

    const handleAudioLoad = useCallback(() => {
        if(audioRef.current) {
            setEndTime(formatTime(audioRef.current.duration));
        }
    },[])

    const handleSliderChange = useCallback((value:string) => {
        if(audioRef.current) {
            setValue(Number(value));
            setStartTime(formatTime(Number(value) * audioRef.current.duration));
        }
    },[])

    const handleSliderMouseUp = useCallback(() => {
        if(audioRef.current && rangeInputRef.current) {
            audioRef.current.currentTime = Number(rangeInputRef.current.value) * audioRef.current.duration;
            UpdateAudioCurrentTime(Number(rangeInputRef.current.value) * audioRef.current.duration);
        }
    },[UpdateAudioCurrentTime])

    const makeAudioControllButton = ():TControllButton[] => [
        { // 5초 전
            buttonSrc: ["https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-prev-5s.png"],
            buttonHandler: () => {
                if(audioRef.current){
                    audioRef.current.currentTime -= 5;
                    UpdateAudioCurrentTime(audioRef.current.currentTime);
                    setValue(value - 1 / audioRef.current.duration * 5)
                    setStartTime(formatTime(Number(audioRef.current.currentTime)));
                }
            },
            alt:"Prev"
        },
        { // 시작 | 정지
            buttonSrc: ["https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-play.png",
            "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-pause.png"],
            buttonHandler: () => {
                let audio = audioRef.current;
                if(audio) {
                    if(!isPause) {
                        audio.pause();
                        if(isRepeat) 
                            clearInterval(isRepeat)
                        setIsPause(true);
                    } else {
                        audio.play();
                        UpdateAudioCurrentTime(audio.currentTime)
                        setIsRepeat(setInterval(() => {
                            if(audio){
                                UpdateAudioCurrentTime(audio.currentTime);
                                setValue(1 / audio.duration * audio.currentTime)
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
                if(audioRef.current){
                    audioRef.current.currentTime += 5;
                    UpdateAudioCurrentTime(audioRef.current.currentTime);
                    setValue(value + 1 / audioRef.current.duration * 5)
                    setStartTime(formatTime(Number(audioRef.current.currentTime)));
                }
            },
            alt:"Next"
        }
    ]
    return (
        <MainContainer>
            <MainWrap>
                <Scripts 
                    scripts={scripts}
                    audioCurrentTime={audioCurrentTime}
                    onScriptClick={handleScriptClick}
                />
                <Suggestions/>
                <AudioPlayer 
                    audioRef={audioRef} 
                    rangeInputRef={rangeInputRef}
                    value={value}
                    url={url}
                    startTime={startTime}
                    endTime={endTime}
                    isPause={isPause}
                    AudioControllButtons={makeAudioControllButton()}
                    onSliderChange={handleSliderChange}
                    onSliderMouseUp={handleSliderMouseUp}
                    onAudioload={handleAudioLoad}
                />
            </MainWrap>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    flex: 1.5 1;
    padding:0 30px;
`
const MainWrap = styled.div`
    position:relative;
    display:flex;
    height:100%;
    
`

export default ReviewMainContainer;