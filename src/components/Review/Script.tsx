import React,{useRef,useEffect} from 'react';
import styled,{css} from 'styled-components';
import {DialogType} from '../../store/modules/ReviewScript';
import QuestionMark from '../Common/QuestionMark';

const CommonFont = `
    font-size:14px;
    font-weight:500;
`
const ScriptBlock = styled.div`
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
    .dialog_container {
        
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
    .time {
        margin-left: 10px;
        font-size: 10px;
        line-height: 1.8;
        color: #9b9b9b;
    }
`
type StyledProps = {
    identity:number,
}
type ScriptProps = {
    dialog:DialogType[],
    onSelectScript:(time:number) => void,
    seekTime:number,
    AutoScrollHandler:(event: React.ChangeEvent<HTMLInputElement>) => void,
    isAuto:boolean,
}
const Script = ({dialog,onSelectScript,seekTime,AutoScrollHandler,isAuto}:ScriptProps) => {

    const containerRef = useRef<HTMLDivElement>(null) 
    const scriptRef = useRef<HTMLDivElement>(null)
    const autoRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if(autoRef.current && isAuto) 
            autoRef.current.checked=true 
    },[isAuto])

    useEffect(() => {
        if(isAuto) {
            scrollMove()
        } 
    },[isAuto,seekTime])
    
    const scrollMove = () => {
        if(containerRef.current && scriptRef.current)
        containerRef.current.scrollTo({
          top: scriptRef.current.offsetTop- 380,
          behavior: 'smooth'
        });
    }
    return (
        <ScriptBlock>
            <div className="record_menu">
                <img className="icon" src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-script.png" alt="Recorded Script"/>
                <span className="text">Recorded Script</span>
                <QuestionMark
                    desctiption={<>
                    수강생 분들 중, 수업 mp3 와 함께 Full Script 가 함께 제공되면 좋겠다는 의견을 많이 주셨어서, 저희가 Zoom 의 API 를 사용하여 녹취록을 free-beta 로 제공해 드립니다.
                    <br/>해당 기능은 저희도 Zoom 기능을 무료로 활용하고 있기에, Zoom API 이슈 발생 시 Script 제공이 지연/누락될 수 있음을 미리 안내 드립니다.
                    <br/>Script 서비스에 대한 수강생 분들의 피드백을 참고하여, 단순 Script 지원을 넘어 다양한 부가 기능 제공이 가능한 Script & review 기능을 만드는 것이 링글 팀의 목표이며, 일정 수준 이상 고도화 성공 시 해당 기능이 유료화 될 수 있음을 미리 공지 드립니다!
                    <br/>감사합니다!
                    <br/>
                    <br/>주의사항
                    <br/>- 튜터와 내가 동시에 말할 때, 화자가 잘못 분리되는 경우가 있습니다.
                    <br/>- 원어민 관점에서 영어 발음이 분석되기에, 일부 스크립트가 정확하지 않을 수 있습니다. 튜터의 스크립트 변환 정도와 비교하여 나의 발음을 체크해보세요.
                    </>}
                    bottom='-200px'
                />
                <form action="" className="autoForm">
                    <label htmlFor="autoScroll">Auto Scroll</label>
                    <input id="autoScroll" type="checkbox" ref={autoRef} onChange={AutoScrollHandler} />
                </form>
            </div>
            <div className="line"></div>
            <DialogContainer ref={containerRef}>
               {dialog.map((v,i) => {
            return (
                (v.formatted_time_to_milliseconds <= seekTime ) && ((seekTime < dialog[i+1].formatted_time_to_milliseconds) || seekTime < v.formatted_end_time_to_milliseconds) ? 
                 <ChatContainer key={v.id} ref={scriptRef} onClick={() => onSelectScript(v.formatted_time_to_milliseconds)} identity={v.role} >
                     {v.role ? <img className="profile_picture" src={v.image_url} alt="tutor"/> : null}
                     <div className="chat_text" style={{opacity:1}}>{v.content}</div>
                     <span className="time">{v.formatted_time}</span>
                 </ChatContainer>
                 : 
                 <ChatContainer key={v.id} onClick={() => onSelectScript(v.formatted_time_to_milliseconds)} identity={v.role} >
                 {v.role ? <img className="profile_picture" src={v.image_url} alt="tutor"/> : null}
                 <div className="chat_text">{v.content}</div>
                 <span className="time">{v.formatted_time}</span>
             </ChatContainer>
             )
         })}
            </DialogContainer>
        </ScriptBlock>
    )
}

export default Script;