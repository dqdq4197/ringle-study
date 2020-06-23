import React,{useEffect} from 'react';
import Graph from '../../components/Review/Graph';
import Feedback from '../../components/Review/Feedback';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';

const ReviewDetailContainer = () => {


    const dispatch = useDispatch();
    
    return (
        <div style={{flex:"1 1"}}>
            <Feedback/>
            <Graph/>
        </div>
    )
}

export default ReviewDetailContainer