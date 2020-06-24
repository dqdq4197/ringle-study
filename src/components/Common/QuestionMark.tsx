import React,{useState} from 'react';
import styled from 'styled-components';

type MarkType = {
    desctiption:React.ReactNode,
    bottom?:string,
}

const QuestionMark = ({desctiption,bottom}:MarkType) => {

    const [toggle, setToggle] = useState(false);

    const onToggleHandler = () => {
        setToggle(!toggle);
    }
    return (
        <QMark onClick={onToggleHandler}>
            ?
            {toggle ? <DescriptionBox onClick={onToggleHandler} bottom={bottom}>{desctiption}</DescriptionBox> : null}
        </QMark>
    )

}

type StyledProps = {
    bottom?:string,
}
const QMark = styled.span`
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
`
const DescriptionBox = styled.span`
    color: #fff;
    font-size: 11px;
    position: absolute;
    background-color: #000;
    padding: 10px;
    border-radius: 3px;
    left: 20px;
    bottom: ${(props:StyledProps) => props.bottom || '-30px'};
    width: 300px;
    opacity: .9;
    z-index: 100;
`
export default QuestionMark;