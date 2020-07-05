import React,{useEffect, useRef, useCallback} from 'react';
import styled from 'styled-components';
import Scripts from '../../components/Review/Scripts';
import Suggestions from '../../components/Review/Suggestions';
import AudioPlayer from '../../components/Review/AudioPlayer';
import {getScriptsThunk, selectScript} from '../../store/modules/ReviewScript';
import {getSuggestionsThunk} from '../../store/modules/ReviewSuggestions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/modules/index';


const ReviewMainContainer = () => {

    const {scripts, url} = useSelector((state:RootState) =>  state.script);
    const dispatch = useDispatch();

    const audioRef = useRef<HTMLAudioElement>(null);
    const rangeInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(getScriptsThunk());
        dispatch(getSuggestionsThunk());
    },[dispatch])

    const handleScriptClick = useCallback((time:number) => {
        dispatch(selectScript(time));
        if(audioRef.current && rangeInputRef.current){
            audioRef.current.currentTime = time;
            rangeInputRef.current.value = (1 / audioRef.current.duration * time).toString() ;
        }
    },[dispatch]);



    return (
        <MainContainer>
            <MainWrap>
                <Scripts 
                    scripts={scripts}
                    onScriptClick={handleScriptClick}
                />
                <Suggestions/>
                <AudioPlayer 
                    audioRef={audioRef} 
                    rangeInputRef={rangeInputRef}
                    url={url}
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