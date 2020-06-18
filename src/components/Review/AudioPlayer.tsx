import React from 'react';
import styled from 'styled-components';

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
            -webkit-appearance: none; background: #7a5de8;
            width:12px;
            height:12px;
            border-radius:50%;
        }
    }
`
const AudioPlayer = () => {
    return (
        <AudioBlock>
            <input min="0" max="1" step="any" className="range" type="range" value="0"/>
            <audio src="https://d2cmeu8d0v67u4.cloudfront.net/audio-merge/201788_bgTykQn9wtWBcBVt4KYf.m4a"></audio>
        </AudioBlock>
    )
}

export default AudioPlayer;