import { ThunkAction } from 'redux-thunk';
import {RootState} from '.';
import {getSuggestionAPI} from '../apis/review';

const GETSUGGESTIONS = 'suggestion/GETSUGGESTIONS' as const;




const getSuggestions = (data:InitialType) => {
    return {
        type:GETSUGGESTIONS,
        payload:data
    }
}



type SuggestionAction =
    | ReturnType<typeof getSuggestions>


type synonymType = {
    id:number,
    representative_pos: string,
    word:string,
}
export type SynonymListType = {
    synonyms:synonymType[],
    voca_record:synonymType,
}

export const getSuggestionsThunk = ():ThunkAction<void,RootState,null,SuggestionAction> => {
    return async(dispatch) => {
        try {
            const data = await getSuggestionAPI()
            dispatch(getSuggestions(data))
        }
        catch (e) {
            console.log(e.error);
        }
    }
}

export type InitialType = {
    filler_word_message:string,
    filler_word_percent:number,
    list_top_50:[string,number][]
    message:string,
    sub_message:string,
    success:boolean,
    synonym_list:SynonymListType[],
}

const initialState:InitialType = {
    filler_word_message:"",
    filler_word_percent:0,
    list_top_50:[],
    message:"",
    sub_message:"",
    success:false,
    synonym_list:[],
}


export default function suggestion(state:InitialType = initialState, action:SuggestionAction) {
    switch (action.type) {
        case GETSUGGESTIONS :
            return action.payload
        default : 
            return state
    }
}