import React, {useState} from 'react';
import styled from 'styled-components';
import {debounce} from 'lodash';

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
type AudioType = {
    url:string,
    currentRef:React.MutableRefObject<any>,
}
const AudioPlayer = ({url,currentRef}:AudioType) => {
    
    
    const [startTime,setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
    const [value, setValue] = useState(0);
    const [isPause, setIsPause] = useState(true);
    //event  -> e.tartget.duration // 

    const formatTime = (time:number) => {
        let minutes, seconds;
        minutes = Math.floor(time / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(time % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    const onChangeEndTime = () => {
        if(currentRef.current)
            setEndTime(formatTime(currentRef.current.duration));
    }

    const onUpdateTime = () => {
        let audio = currentRef.current;
        if(audio) {
            setStartTime(formatTime(audio.currentTime))
            if(!isNaN(audio.duration))
                setValue(1/audio.duration * audio.currentTime)
        }
    }
    
    //디바운스 직접 구현 
    const onChangeRange = (text:string) => {
        if(currentRef.current) {
            setValue(Number(text));
            setStartTime(formatTime(Number(text) * currentRef.current.duration));
        }
        debounce(() => {
            // currentRef.current.currentTime = text;
            console.log('a');
        }, 100)
    }

    const prevHandler = () => {
        if(currentRef.current)
            currentRef.current.currentTime -= 5;
    }
    const startHandler = () => {
        let audio = currentRef.current;
        if(audio)
            if(!isPause) {
                audio.pause();
                setIsPause(true);
            } else {
                audio.play();
                setIsPause(false);
            }
            
    }
    const nextHandler = () => {
        if(currentRef.current)
            currentRef.current.currentTime += 5;
    }

    return (
        <AudioBlock>
            <input min="0" max="1" step="any" className="range" type="range" value={value} onChange={(e) => onChangeRange(e.target.value)}/>
            <audio preload="auto" src={url} ref={currentRef} onLoadedData={onChangeEndTime} onTimeUpdate={onUpdateTime}></audio>
            <TimeBar>
                <span className="audio_time start_time">{startTime}</span>
                <span className="audio_time end_time">{endTime}</span>
            </TimeBar>
            <ControllBar>
                <button onClick={prevHandler}>
                    <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-prev-5s.png" alt="Prev"/>
                </button>
                <button onClick={startHandler} className="startBtn">
                    {isPause 
                    ? <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-play.png" alt="Play"/>
                    : <img style={{width:20}} src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-pause.png" alt="Pouse" />
                    }
                </button>
                <button onClick={nextHandler}>
                    <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-next-5s.png" alt="Next"/>
                </button>
            </ControllBar>
        </AudioBlock>
    )
}

export default AudioPlayer;