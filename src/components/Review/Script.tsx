import React,{useRef,useEffect} from 'react';
import styled,{css} from 'styled-components';
import {DialogType} from '../../modules/ReviewScript';

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
    useEffect(() => {
        if(isAuto)
            scrollMove() 
    },[seekTime])
    
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
                <span className="question_icon">?</span>
                <form action="" className="autoForm">
                    <label htmlFor="autoScroll">Auto Scroll</label>
                    <input id="autoScroll" type="checkbox" onChange={AutoScrollHandler} />
                </form>
            </div>
            <div className="line"></div>
            <DialogContainer ref={containerRef}>
               {dialog.map((v,i) => {
            return (
                (v.formatted_time_to_milliseconds <= seekTime ) && ((seekTime < dialog[i+1].formatted_time_to_milliseconds) || seekTime < v.formatted_end_time_to_milliseconds) ? 
                 <ChatContainer key={v.id} ref={scriptRef} onClick={() => onSelectScript(v.formatted_time_to_milliseconds)} identity={v.role} >
                     {v.role ? <img className="profile_picture" src={v.image_url} alt="profile picture"/> : null}
                     <div className="chat_text" style={{opacity:1}}>{v.content}</div>
                     <span className="time">{v.formatted_time}</span>
                 </ChatContainer>
                 : 
                 <ChatContainer key={v.id} onClick={() => onSelectScript(v.formatted_time_to_milliseconds)} identity={v.role} >
                 {v.role ? <img className="profile_picture" src={v.image_url} alt="profile picture"/> : null}
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