import axios from 'axios';

const GETSCRIPTS = 'script/GETSCRIPTS' as const;

const getScript = (data:ScriptProps) => {
    return {
        type: GETSCRIPTS,
        payload: {
            dialog:data.dialog_array,
            url:data.url
        }
    }
}


type ScriptAction =
    | ReturnType<typeof getScript>

export type DialogType = {
    content: string
    end_time: string
    formatted_end_time_to_milliseconds: number
    formatted_time: string
    formatted_time_to_milliseconds: number
    id: number
    image_url: string
    role: number
    start_time: string
}

interface ScriptProps {
    dialog_array:DialogType[],
    url:string,
}

type InitialType = {
    dialog: DialogType[],
    url:string,
}

export const getScriptsThunk = () => {
    return (dispatch:any) => {
        axios.get("https://www.ringleplus.com/api/v3/student/lesson_record/test/script")
        .then((res) => {
            dispatch(getScript(res.data))
        })
        .catch(err => {
            console.log(err.error);
        })
    }
    
}

const initialState:InitialType = {
    dialog:[],
    url:"",
}

export default function script(state:InitialType = initialState, action:ScriptAction) {
    switch (action.type) {
        case GETSCRIPTS :
            return {
                ...state,
                dialog:action.payload.dialog,
                url:action.payload.url,
            }
        default : 
            return state
    }
}