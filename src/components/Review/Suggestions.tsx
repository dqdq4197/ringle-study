import React,{useState} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/modules';
import * as S from './Suggestions.style';
import QuestionMark from '../Common/QuestionMark';



type SuggestionType = {
}
const Suggestions = ({}:SuggestionType) => {


    const [Ftoggle, setFtoggle] = useState(false);
    const [Stoggle, setStoggle] = useState(false);
    const {
        filler_word_message,
        filler_word_percent,
        list_top_50,
        message,
        sub_message,
        synonym_list
    } = useSelector((state:RootState) => state.suggestion);

    return (
        <SuggestionBlock>
            <S.MenuTitle>
                <img className="icon" src="https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/common/icon/ic-suggestion.png" alt="Suggestion"/>
                <span className="text">Suggestions</span>
                <QuestionMark
                    desctiption={
                        <>
                            내가 주로 말하는 단어에 대한 원어민 사용 빈도 수, 동의어 및 Filler Word 분석 데이터를 제공합니다. Filler Word는 like, um과 같이 의미 없이 문장에서 사용되는 단어들을 말합니다.
                            주로 사용한 단어의 동의어를 확인하고, 다음 수업에서 활용해보세요.<br/>
                            Filler Word의 수치(%)는 한 문장을 발화할 때, Filler word를 한번 이상 사용할 확률을 의미합니다. 권장값은 약 30% 내 입니다.
                        </>
                    }
                />
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
                    <S.WordList onClick={() => {setFtoggle(!Ftoggle)}}>
                        <span>자주 사용하는 단어</span>
                        {Ftoggle ?
                            <img src="https://d2mkevusy1mb28.cloudfront.net/mobile/btn-dropdown-nor%403x.png" alt="arrow-up"/>
                        :   <img src="https://d2mkevusy1mb28.cloudfront.net/mobile/btn-dropdown-close-nor%403x.png" alt="arrow-down"/>
                        }
                    </S.WordList>
                    {Ftoggle ?
                        <ul style={{marginTop:10}}>
                            {list_top_50.map(word => {
                                return (
                                    <S.SuggestionSubBox key={word[0]}>
                                        <span className="suggestion-word">{word[0]}</span>
                                        <span className="suggestion-word">{word[1]}</span>
                                    </S.SuggestionSubBox>
                                )
                            })}
                        </ul> 
                    : null }
                    
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
                    <S.SuggestionButton onClick={() => setStoggle(!Stoggle)}>
                        동의어 리스트 {Stoggle ? '접기' : '확인'}
                    </S.SuggestionButton>
                    <S.SuggestionContentBox style={{marginTop:10}}>
                        동의어를 클릭하시면 복사됩니다.
                    </S.SuggestionContentBox>
                    {Stoggle ? 
                        <ul>
                            {synonym_list.map(synonym => {
                                return (
                                    <S.SynonymWordBox key={synonym.voca_record.id}>
                                        <span className="word">{synonym.voca_record.word}</span>
                                        <img src="https://d2mkevusy1mb28.cloudfront.net/mobile/btn-dropdown-nor%403x.png" alt="arrow-up"/>
                                    </S.SynonymWordBox>
                                )
                            })} 
                        </ul>
                    : null }
                </S.SuggestionBox>
            </S.ScriptContainer>
        </SuggestionBlock>
    )
}

const SuggestionBlock = styled.div`
    flex:1;
    margin-left: 60px;
    max-width: 40%;
`

export default Suggestions;