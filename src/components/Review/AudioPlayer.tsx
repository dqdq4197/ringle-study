import React from 'react';
import styled from 'styled-components'; 


type TControllButton = {
    buttonSrc: string[],
    buttonHandler:() => void,
    alt:string,
}
type AudioType = {
    url:string,
    audioRef:React.RefObject<HTMLAudioElement>,
    rangeInputRef: React.RefObject<HTMLInputElement>,
    value:number,
    startTime:string,
    endTime:string,
    isPause:boolean,
    AudioControllButtons:TControllButton[],
    onSliderChange:(value:string) => void,
    onSliderMouseUp:() => void,
    onAudioload:() => void,
}

const AudioPlayer = ({ url, audioRef, rangeInputRef, value, startTime,  endTime, isPause,  AudioControllButtons, onSliderMouseUp,  onAudioload,  onSliderChange}:AudioType) => {
    
  
    return (
        <AudioBlock>
            <input id="range" min="0" max="1" step="any" className="range" type="range" onMouseUp={onSliderMouseUp} value={value} ref={rangeInputRef} onChange={(e) =>{onSliderChange(e.target.value); }}/>
            <audio preload="auto" src={url} ref={audioRef} onLoadedData={onAudioload} ></audio>
            <TimeBar>
                <span className="audio_time start_time">{startTime}</span>
                <span className="audio_time end_time">{endTime}</span>
            </TimeBar>
            <ControllBar>
                {AudioControllButtons.map((btn,index) => {
                    return index === 1 ? 
                        <button onClick={btn.buttonHandler} className="startBtn" key={btn.buttonSrc[0]}> 
                        {isPause ? 
                            <img src={btn.buttonSrc[0]} alt={btn.alt}/> :
                            <img style={{width:20}} src={btn.buttonSrc[1]} alt={btn.alt}/>
                        }
                        </button> :
                        <button onClick={btn.buttonHandler} key={btn.buttonSrc[0]}>
                            <img src={btn.buttonSrc[0]} alt={btn.alt}/>
                        </button>
                })}
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