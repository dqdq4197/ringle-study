import React,{useState, useEffect} from 'react';
import styled from 'styled-components'; 
import {updateAudioCurrentTime} from '../../store/modules/ReviewScript';
import {useDispatch} from 'react-redux';

type AudioType = {
    url:string,
    audioRef:React.RefObject<HTMLAudioElement>,
    rangeInputRef: React.RefObject<HTMLInputElement>,
}

const AudioPlayer = ({ url, audioRef, rangeInputRef}:AudioType) => {
    
    const dispatch = useDispatch();
    
    const [currentTime, setCurrentTime] = useState('00:00');
    const [endTime, setEndTime] = useState("00:00");
    const [render, setRender] = useState(true);
    const [isPause, setIsPause] = useState(true);
    const [isRepeat, setIsRepeat] = useState(0);

    useEffect(() => {
        if(rangeInputRef.current){
            setCurrentTime(rangeInputRef.current.value)
        }
    },[audioRef.current?.currentTime])

    const formatTime = (time:number) => {
        let minutes, seconds;
        minutes = Math.floor(time / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(time % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    const handleAudioLoad = () => {
        if(audioRef.current) {
            setEndTime(formatTime(audioRef.current.duration));
        }
    }

    const handleSliderMouseUp = () => {
        if(audioRef.current && rangeInputRef.current) {
            audioRef.current.currentTime = Number(rangeInputRef.current.value) * audioRef.current.duration;
            dispatch(updateAudioCurrentTime(Number(rangeInputRef.current.value) * audioRef.current.duration));
        }
    }

    const updateAlltime = (time:number) => {
        if(audioRef.current && rangeInputRef.current) {
            dispatch(updateAudioCurrentTime(audioRef.current.currentTime));
            rangeInputRef.current.value = time.toString();
        }
    }

    const handlePrevButtonClick = () => {
        if(audioRef.current && rangeInputRef.current) {
            audioRef.current.currentTime -= 5;
            updateAlltime(1 / audioRef.current.duration * audioRef.current.currentTime);
            setRender(!render);
        }
    }

    const handleStartButtonClick = () => {
        let audio = audioRef.current;
        if(audio) {
            if(!isPause) {
                audio.pause();
                if(isRepeat) 
                    clearInterval(isRepeat)
                setIsPause(true);
            } else {
                audio.play();
                dispatch(updateAudioCurrentTime(audio.currentTime))
                setIsRepeat(setInterval(() => {
                    if(audio) 
                        updateAlltime(1 / audio.duration * audio.currentTime)
                }, 1000));
                setIsPause(false);
            }
        }
    }

    const handleNextButtonClick = () => {
        if(audioRef.current && rangeInputRef.current) {
            audioRef.current.currentTime += 5;
            updateAlltime(1 / audioRef.current.duration * audioRef.current.currentTime);
            setRender(!render)
        }
    }

    

    return (
        <AudioBlock>
            <input id="range" min="0" max="1" step="any" defaultValue="0" className="range" type="range" 
                onMouseUp={handleSliderMouseUp} 
                onChange={(event) => setCurrentTime((event.target as HTMLInputElement).value)} 
                ref={rangeInputRef}
            />
            <audio preload="auto" src={url} ref={audioRef} onLoadedData={handleAudioLoad} ></audio>
            <TimeBar>
                <span className="audio_time start_time">
                    {audioRef.current?.duration ? 
                        formatTime(Number(currentTime) * audioRef.current.duration) 
                    :   "00:00"
                    }
                </span>
                <span className="audio_time end_time">{endTime}</span>
            </TimeBar>
            <ControllBar>
                <button onClick={handlePrevButtonClick}>
                    <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-prev-5s.png" alt="Prev"/>
                </button>
                <button className="startBtn" onClick={handleStartButtonClick}>
                    {isPause ? 
                        <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-play.png" alt="Play"/>
                    :   <img style={{width:20}} src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-pause.png" alt="Stop"/>
                    }
                </button>
                <button onClick={handleNextButtonClick}>
                    <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-next-5s.png" alt="Next"/>
                </button>
            </ControllBar>
        </AudioBlock>
    )
}

const AudioBlock = styled.div`
    position:absolute;
    width:100%;
    height:100px;
    bottom:0;
    .range {
        appearance: none;
        width: 100%;
        height: 5px;
        border-radius: 2.5px;
        background-color: #f3f3f3;
        outline: none;
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            background: ${({theme}) => theme.accentColor};
            width:12px;
            height:12px;
            border-radius:50%;
            cursor:pointer;
        }
    }
`
const TimeBar = styled.div`
    position:relative;
    ${({theme}) => theme.flexBox};
    justify-content:space-between;
    top:10px;
    .audio_time {
        font-size:9px;
        color:${({theme}) => theme.light1};
    }
`
const ControllBar = styled.div`
    display:flex;
    justify-content: space-evenly;
    button { 
        background:none;
        border:none;
        width:35px;
        img {
            width:23px;
        }
    }
    .startBtn {
        width:40px;
        height:30px;
        background:${({theme}) => theme.accentColor};
        border-radius:2px;
        img {
            width: 12px;
        }
    }
`

export default AudioPlayer;