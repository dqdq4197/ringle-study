import React from 'react';
import styled from 'styled-components';


const TemplateBlock = styled.div`
    position:absolute;
    width:100%;
    height:100%;
`

const flexBox = `
    display:flex;
    align-items:center;
`
const HeaderBlock = styled.header`
    ${flexBox};
    padding:28px 0 28px 30px;
    .icon {
        width:20px;
    }
    .title-container {
        ${flexBox};
        .title {
            margin-left:8px;
            font-weight:600;
            font-size:24px;
            color:${({theme}) => theme.light2};
        }
    }
    .date-container {
        ${flexBox};
        margin-left:15px;
        .date {
            margin-left:6px;
            font-size:12px;
            color:${({theme}) => theme.light1};
            line-height:1.5;
        }
    }
`

const MainBlock = styled.div`
    position:relative;
    display:flex;
    width: calc(100% - 60px);
    height:92%;
    
`

type TemplateProps = {
    children: React.ReactNode;
}
const ReviewTemplate = ({children}:TemplateProps) => {
    return (
        <TemplateBlock>
            <HeaderBlock>
                <div className="title-container">
                    <img className="icon" src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-past-back.png" alt="icon"/>
                    <span className="title">What are you getting into it? – Notes from a start-up founder: Immersion and concentration</span>
                </div>
                <div className="date-container">
                    <img className="icon" src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-calendar.png" alt="icon"/>
                    <span className="date">'20년 5월 23일 11:00 PM (Seoul)</span>
                </div>
            </HeaderBlock>
            <MainBlock>
                {children}
            </MainBlock>

        </TemplateBlock>

    )
}

export default ReviewTemplate;