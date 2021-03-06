import React,{ useRef, useEffect} from 'react';
import styled,{css} from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { BsCheckBox } from "react-icons/bs";
import {useDispatch, useSelector} from 'react-redux';
import TextareaAutosize  from 'react-textarea-autosize';
import {RootState} from '../../store/modules';
import {DialogType} from '../../store/modules/ReviewScript';
import QuestionMark from '../Common/QuestionMark';
import storage from '../../lib/storage';
import {editReady, editComplete} from '../../store/modules/ReviewScript';

type StyledProps = {
    identity:number,
}

type ScriptProps = {
    scripts:DialogType[],
    onScriptClick:(time:number) => void,
}

const Scripts = ({scripts, onScriptClick}:ScriptProps) => {

    const {editTarget,editContent,audioCurrentTime} = useSelector((state:RootState) => state.script);
    const dispatch = useDispatch();

    const DialogContainerRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const autoInputRef = useRef<HTMLInputElement>(null);
    const editAreaRef = useRef<HTMLTextAreaElement>(null);
    const isAuto = storage.get('AutoScroll');

    useEffect(() => {
        if(autoInputRef.current && isAuto) 
            autoInputRef.current.checked = true;
    },[isAuto])

    useEffect(() => {
        if(isAuto) {
            scrollMove()
        } 
    },[isAuto,audioCurrentTime])

    const scrollMove = () => {
        if(DialogContainerRef.current && chatContainerRef.current)
            DialogContainerRef.current.scrollTo({
              top: chatContainerRef.current.offsetTop- 380,
              behavior: 'smooth'
            });
    }

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        storage.set("AutoScroll", event.target.checked);
    }
    
    const handleEditReadyClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>, id:number, content:string) => {
        event.stopPropagation();
        dispatch(editReady(id,content));
    }
    
    const handleEditedClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>, id:number) => {
        event.stopPropagation();
        if(editAreaRef.current)
            dispatch(editComplete(id,editAreaRef.current.value));
        dispatch(editReady(null, null))
    }

    return (
        <ScriptContainer>
            <div className="record_menu">
                <img className="icon" src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-script.png" alt="Recorded Script"/>
                <span className="text">
                    Recorded Script
                </span>
                <QuestionMark
                    desctiption={
                        <>
                            수강생 분들 중, 수업 mp3 와 함께 Full Script 가 함께 제공되면 좋겠다는 의견을 많이 주셨어서, 저희가 Zoom 의 API 를 사용하여 녹취록을 free-beta 로 제공해 드립니다.
                            <br/>해당 기능은 저희도 Zoom 기능을 무료로 활용하고 있기에, Zoom API 이슈 발생 시 Script 제공이 지연/누락될 수 있음을 미리 안내 드립니다.
                            <br/>Script 서비스에 대한 수강생 분들의 피드백을 참고하여, 단순 Script 지원을 넘어 다양한 부가 기능 제공이 가능한 Script & review 기능을 만드는 것이 링글 팀의 목표이며, 일정 수준 이상 고도화 성공 시 해당 기능이 유료화 될 수 있음을 미리 공지 드립니다!
                            <br/>감사합니다!
                            <br/>
                            <br/>주의사항
                            <br/>- 튜터와 내가 동시에 말할 때, 화자가 잘못 분리되는 경우가 있습니다.
                            <br/>- 원어민 관점에서 영어 발음이 분석되기에, 일부 스크립트가 정확하지 않을 수 있습니다. 튜터의 스크립트 변환 정도와 비교하여 나의 발음을 체크해보세요.
                        </>
                    }
                    bottom='-200px'
                />
                <form action="" className="autoForm">
                    <label htmlFor="autoScroll">Auto Scroll</label>
                    <input id="autoScroll" type="checkbox" ref={autoInputRef} onChange={handleCheckBoxChange} />
                </form>
            </div>
            <div className="line"></div>
            <DialogContainer ref={DialogContainerRef}>
               {scripts.map((script,index) => {
                    return (
                        (script.formatted_time_to_milliseconds <= audioCurrentTime ) && ((audioCurrentTime < scripts[index+1].formatted_time_to_milliseconds) || audioCurrentTime < script.formatted_end_time_to_milliseconds) ? 
                            <ChatContainer key={script.id} ref={chatContainerRef} onClick={() => onScriptClick(script.formatted_time_to_milliseconds)} identity={script.role} >
                                {script.role ?
                                    <img className="profile_picture" src={script.image_url} alt="tutor"/> 
                                :   null
                                }
                                {script.id === editTarget ? 
                                    <>
                                        <TextareaAutosize className="edit_area" defaultValue={editContent || ""} ref={editAreaRef} onClick={(e) => e.stopPropagation()} />
                                        <div className="util-container">
                                            <div className="edit-script" onClick={(event) => handleEditedClick(event,script.id)}>
                                                <BsCheckBox/>
                                            </div>
                                            <span className="time">
                                                {script.formatted_time}
                                            </span>
                                        </div>
                                    </>
                                :   <>
                                        <div className="chat_text" style={{opacity:1}}>
                                            {script.content}
                                        </div>
                                        <div className="util-container">
                                            <div className="edit-script" onClick={(event) => handleEditReadyClick(event,script.id,script.content)}>
                                                <FiEdit/>
                                            </div>
                                            <span className="time">
                                                {script.formatted_time}
                                            </span>
                                        </div>
                                    </>
                                }
                            </ChatContainer>
                        :   <ChatContainer key={script.id} onClick={() => onScriptClick(script.formatted_time_to_milliseconds)} identity={script.role} >
                                {script.role ?
                                    <img className="profile_picture" src={script.image_url} alt="tutor"/>
                                :   null
                                }
                                <div className="chat_text">
                                    {script.content}
                                </div>
                                <span className="time">
                                    {script.formatted_time}
                                </span>
                            </ChatContainer>
                    )
                })}
            </DialogContainer>
        </ScriptContainer>
    )
}

export default Scripts;

const CommonFont = `
    font-size:14px;
    font-weight:500;
`
const ScriptContainer = styled.div`
    flex:1;
    .record_menu {
        ${({theme}) => theme.flexBox};
    }
    .icon {
        width:22px;
    }
    .text {
        color:${({theme}) => theme.light1};
        ${CommonFont};
        margin-left:3px;
    }
    .question_icon {
        width: 10px;
        height: 10px;
        border: 1px solid #9b9b9b;
        border-radius: 50%;
        font-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        cursor: pointer;
        position: relative;
    }
    .autoForm {
        margin-left:10px;
        ${CommonFont};
        color:${({theme}) => theme.light1};
        ${({theme}) => theme.flexBox};
    }
    .line {
        margin-top: 10px;
        width: 100%;
        height: 1px;
        background-color: #eaeaea;
    }
`

//중복
const DialogContainer = styled.div`
    height:calc(100% - 150px);
    overflow-y:scroll;
    &::-webkit-scrollbar {
        display:none;
    }
        
`
const ChatContainer = styled.div`
    display:flex;
    margin-top:14px;
    width:100%;
    cursor:pointer;
    align-items: flex-end;
    
    ${({identity}:StyledProps) => identity ? 
        css`
            flex-direction: row;
            margin-right:auto;
            .chat_text {
                background-color: #fff;
                color: #3c3752;
            }
        `: 
        css`
            flex-direction: row-reverse;
            margin-left:auto;
            .chat_text {
                background:${({theme}) => theme.accentColor};
                color:#fff;
            }
        `
    }; 
    .profile_picture {
        min-width:27px;
        height:27px;
        margin:0 0 auto 10px;
        border-radius: 50%;
        object-fit: cover;
    }
    .chat_text {
        border-radius: 3px;
        padding: 10px 15px;
        opacity: .7;
        box-shadow: 0 0 9px 0 rgba(122,93,232,.15);    
        margin-left: 22px;
        font-size: 12px;
        line-height: 1.5;
    }
    .util-container {
        height:38px;
        
    }
    .edit_area {
        width:100%;
        margin-left: 22px;
        border-radius:3px;
        border:none;
        padding:10px;
        font-size:12px;
        line-height:1.5;
        font-weight:600;
        border:1px solid rgba(0,0,0,.5);
    }
    .edit-script {
        position: relative;
        opacity: .5;
        text-align: right;
        top: 10px;
        color: #49006c;
        transition:.3s;
        &:hover {
            color:${({theme}) =>theme.accentColor};
            opacity:1;
        }
    }
    .time {
        margin-left: 10px;
        font-size: 10px;
        line-height: 1.8;
        color: #9b9b9b;
    }
`

