import styled from 'styled-components';

const MenuTitle = styled.div`
    ${({theme}) => theme.flexBox};
    .icon {
        width:23px;   
    }
    .text {
        margin-left:3px;
        font-size:14px;
        font-weight:500;
        color:${({theme}) => theme.light1};
    }
`
const QuestionMark = styled.span`
    ${({theme}) => theme.questionMark};
    &:hover {
        background:#dcdcdc;
    }
`

//중복
const Line = styled.div` 
    margin-top: 10px;
    width: 100%;
    height: 1px;
    background-color: #eaeaea;
`

//중복
const ScriptContainer = styled.div`
    height: calc(100% - 150px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display:none;
    }
`

const SuggestionBox = styled.div`
    margin: 12px;
    border-radius: 3px;
    box-shadow: 0 0 9px 0 rgba(122,93,232,.15);
    background-color: #fff;
    padding: 16px 30px;
    position: relative;
`

const SuggestionContentBox = styled.div`
    font-size: 11px;
    line-height: 1.64;
    color: #9b9b9b;
    margin-right: 30px;
    & + & {
        font-size: 9px; 
        margin-top: 10px;
    }
`

const SuggestionFeedbackText = styled.div`
    cursor: pointer;
    font-size: 8px;
    color: #cdcdcd;
    margin-top: 27px;
    text-decoration: underline;
`

const SuggestionLike = styled.div`
    position: absolute;
    cursor: pointer;
    width: 26px;
    top: 0;
    right: 10px;
    img {
        width:26px;
    }
`

export {
    MenuTitle,
    QuestionMark,
    Line,
    ScriptContainer,
    SuggestionBox,
    SuggestionContentBox,
    SuggestionFeedbackText,
    SuggestionLike
}