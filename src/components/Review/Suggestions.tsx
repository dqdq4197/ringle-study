import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';
import * as S from './Suggestions.style';

const SuggestionBlock = styled.div`
    flex:1;
    margin-left: 60px;
    max-width: 40%;
`
const Suggestions = () => {

    const {
        filler_word_message,
        filler_word_percent,
        list_top_50,
        message,
        sub_message,
        success,
        synonym_list
    } = useSelector((state:RootState) => state.suggestion);

    return (
        <SuggestionBlock>
            <S.MenuTitle>
                <img className="icon" src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-suggestion.png" alt="Suggestion"/>
                <span className="text">Suggestions</span>
                <S.QuestionMark>?</S.QuestionMark>
            </S.MenuTitle>
            <S.Line/>
            <S.ScriptContainer>
                <S.SuggestionBox>
                    <S.SuggestionLike>
                        <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/past-like.png" alt="like"/>
                    </S.SuggestionLike>
                    <S.SuggestionContentBox>
                        다음은 자주 사용하시는 50개 단어 입니다.
                    </S.SuggestionContentBox>
                    <S.SuggestionFeedbackText>
                        링글의 제안이 정확하지 않은거 같아요.
                    </S.SuggestionFeedbackText>
                </S.SuggestionBox>
                <S.SuggestionBox>
                    <S.SuggestionLike>
                        <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/past-like.png" alt="like"/>
                    </S.SuggestionLike>
                    <S.SuggestionContentBox>
                        필러워드를 사용할 확률은 {Math.floor(filler_word_percent)}% 입니다. {filler_word_message}
                    </S.SuggestionContentBox>
                    <S.SuggestionContentBox>
                    * 필러워드(문장 사이를 채워 주는 영어 추임새, ex)Hmm, I meant ~)
                    </S.SuggestionContentBox>
                    <S.SuggestionFeedbackText>
                        링글의 제안이 정확하지 않은거 같아요.
                    </S.SuggestionFeedbackText>
                </S.SuggestionBox>
                <S.SuggestionBox>
                    <S.SuggestionLike>
                        <img src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/past-like.png" alt="like"/>
                    </S.SuggestionLike>
                    <S.SuggestionContentBox>
                        {message} {sub_message} 
                    </S.SuggestionContentBox>
                    <S.SuggestionFeedbackText>
                        링글의 제안이 정확하지 않은거 같아요.
                    </S.SuggestionFeedbackText>
                </S.SuggestionBox>
            </S.ScriptContainer>
        </SuggestionBlock>
    )
}

export default Suggestions;