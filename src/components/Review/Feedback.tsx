import React from 'react';
import styled from 'styled-components';
import QuestionMark from '../Common/QuestionMark';



const Feedback = () => {
    return (
        <div>
            <FeedbackBox>
                <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-feedback.png" alt="Tutor's Feedback"/>
                <span>Tutor's Feedback</span>
                <QuestionMark
                    desctiption="튜터가 남긴 나의 영어 실력에 대한 평가 점수, 피드백 및 교정결과를 확인할 수 있습니다. 평가 점수를 바탕으로 IELTS, TOEIC SPEAKING, TOEFL 예상 점수도 확인할 수 있습니다."
                    bottom="-45px"
                />
            </FeedbackBox>
            <Line/>
        </div>
    )
}

export default Feedback;

const FeedbackBox = styled.div`
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
