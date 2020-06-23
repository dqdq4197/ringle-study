import axios from 'axios';



const GETSUGGESTIONS = 'suggestion/GETSUGGESTIONS' as const;




const getSuggestions = (data:InitialType) => {
    return {
        type:GETSUGGESTIONS,
        payload:data
    }
}



type ScriptAction =
    | ReturnType<typeof getSuggestions>


type synonymType = {
    id:number,
    representative_pos: string,
    word:string,
}
export type SynonymListType = {
    synonyms:synonymType[],
    voca_record:synonymType[],
}

export const getSuggestionsThunk = () => {
    return (dispatch:any) => {
        axios.get("https://www.ringleplus.com/api/v3/student/lesson_record/test/suggestions")
        .then((res) => {
            let data:InitialType = {
                filler_word_message:res.data.filler_word_message,
                filler_word_percent:res.data.filler_word_percent,
                list_top_50:res.data.list_top_50,
                message:res.data.message,
                sub_message:res.data.sub_message,
                success:res.data.success,
                synonym_list:res.data.synonym_list,
            }
            dispatch(getSuggestions(data))
        })
        .catch(err => {
            console.log(err.error);
        })
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


export default function suggestion(state:InitialType = initialState, action:ScriptAction) {
    switch (action.type) {
        case GETSUGGESTIONS :
            return action.payload
        default : 
            return state
    }
}