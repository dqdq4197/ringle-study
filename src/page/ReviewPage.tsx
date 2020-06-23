import React from 'react';
import styled from 'styled-components';
import ReviewScriptContainer from '../containers/Review/ReviewScriptContainer';
import ReviewDetailContainer from '../containers/Review/ReviewDetailContainer';
import ReviewTemplate from '../components/Review/ReviewTemplate';

const VerticalLine = styled.div`
    width:1px;
    height:100%;
    background:#f3f3f3;
`

const ReviewPage = () => {
    return (
        <ReviewTemplate>
            <ReviewScriptContainer/>
            <VerticalLine/>
            <ReviewDetailContainer/>
        </ReviewTemplate>
    )
}


export default ReviewPage;