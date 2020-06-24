import { ThunkAction } from 'redux-thunk';
import {RootState} from '.';
import {getScriptAPI} from '../apis/review';

const GETSCRIPTS = 'script/GETSCRIPTS' as const;
const SELECTSCRIPT = 'script/SELECTSCRIPT' as const;
const CHANGERANGE = 'script/CHANGERANGE' as const;


const getScript = (data:ScriptProps) => {
    return {
        type: GETSCRIPTS,
        payload: {
            dialog:data.dialog_array,
            url:data.url
        }
    }
}

export const selectScript = (time:number) => {
    return {
        type: SELECTSCRIPT,
        payload: time,
    }
}

export const changeRange = (time:number) => {
    return {
        type: CHANGERANGE,
        payload: time,
    }
}


// suggestion func 



type ScriptAction =
    | ReturnType<typeof getScript>
    | ReturnType<typeof selectScript>
    | ReturnType<typeof changeRange>

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

export type ScriptProps = {
    dialog_array:DialogType[],
    url:string,
}




type InitialType = {
    dialog: DialogType[],
    url:string,
    seekTime:number,
    isStart:boolean,
}

export const getScriptsThunk = ():ThunkAction<void,RootState,null,ScriptAction> => {
    return async(dispatch) => {
        try {
            const data = await getScriptAPI()
            dispatch(getScript(data))
        }
        catch (e) {
            console.log(e.error)
        }
    }
    
}



const initialState:InitialType = {
    dialog:[],
    url:"",
    seekTime:0,
    isStart:false,
}

export default function script(state:InitialType = initialState, action:ScriptAction) {
    switch (action.type) {
        case GETSCRIPTS :
            return {
                ...state,
                dialog:action.payload.dialog,
                url:action.payload.url,
            }
        case SELECTSCRIPT :
            return {
                ...state,
                seekTime:action.payload,
            }
        case CHANGERANGE :
            return {
                ...state,
                seekTime:action.payload,
            }
        default : 
            return state
    }
}