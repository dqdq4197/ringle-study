import React from 'react';
import styled from 'styled-components';
import Graph from '../../components/Review/Graph';
import Feedback from '../../components/Review/Feedback';

const ReviewDetailContainer = () => {


    return (
        <DetailContainer>
            <Feedback/>
            <Graph/>
        </DetailContainer>
    )
}


const DetailContainer = styled.div`
    flex:1 1;
    padding:0 30px;
`
export default ReviewDetailContainer