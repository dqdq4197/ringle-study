import React from 'react';
import styled from 'styled-components';
import QuestionMark from '../Common/QuestionMark';



const Graph = () => {
    return (
        <GraphContainer>
            <GraphBox>
                <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-analytics.png" alt="Summary graph"/>
                <span>Summary graph</span>
                <QuestionMark
                    desctiption="수업 시간 동안 사용한 단어의 종류, 분당 말하기 속도를 확인할 수 있습니다. 튜터와 비교하여, 원어민 대비 나의 실력이 어느 정도인지 체크해보세요."
                />
            </GraphBox>
            <Line/>
        </GraphContainer>
    )
}

export default Graph;

const GraphContainer = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 400px;
    padding-bottom: 25px;
`
const GraphBox = styled.div`
    ${({theme}) => theme.flexBox};
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.light1};
    img {
        width: 24px;
        margin-right:3px;

    }
`
const Line = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 1px;
    background-color: #eaeaea;
`

