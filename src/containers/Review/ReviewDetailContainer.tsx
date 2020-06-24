import React,{useEffect} from 'react';
import styled from 'styled-components';
import Graph from '../../components/Review/Graph';
import Feedback from '../../components/Review/Feedback';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/modules';

const ReviewDetailContainer = () => {


    const dispatch = useDispatch();
    
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