import { ThunkAction } from 'redux-thunk';
import {RootState} from '.';
import {getScriptAPI} from '../apis/review';

const GETSCRIPTS = 'script/GETSCRIPTS' as const;
const SELECTSCRIPT = 'script/SELECTSCRIPT' as const;
const CHANGERANGE = 'script/CHANGERANGE' as const;
const EDITREADY = 'script/EDITREADY' as const;
const EDITCOMPLETE = 'script/EDITCOMPLETE' as const;

const getScript = (data:ScriptProps) => {
    return {
        type: GETSCRIPTS,
        payload: {
            scripts:data.dialog_array,
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

export const editReady= (id:number|null,content:string | null) => {
    return {
        type: EDITREADY,
        payload: {
            id,
            content,
        }
    }
}

export const editComplete = (id:number,content:string) => {
    return {
        type: EDITCOMPLETE,
        payload: {
            id,
            content
        }
    }

}

type ScriptAction =
    | ReturnType<typeof getScript>
    | ReturnType<typeof selectScript>
    | ReturnType<typeof changeRange>
    | ReturnType<typeof editReady>
    | ReturnType<typeof editComplete>

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
    scripts: DialogType[],
    url:string,
    audioCurrentTime:number,
    isStart:boolean,
    editTarget:number | null,
    editContent:string | null,
    editedContent:string | null,
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
    scripts:[],
    url:"",
    audioCurrentTime:0,
    isStart:false,
    editTarget:null,
    editContent:null,
    editedContent:null,
}

export default function script(state:InitialType = initialState, action:ScriptAction) {
    switch (action.type) {
        case GETSCRIPTS :
            return {
                ...state,
                scripts:action.payload.scripts,
                url:action.payload.url,
            }
        case SELECTSCRIPT :
            return {
                ...state,
                audioCurrentTime:action.payload,
            }
        case CHANGERANGE :
            return {
                ...state,
                audioCurrentTime:action.payload,
            }
        case EDITREADY :
            return {
                ...state,
                editTarget:action.payload.id,
                editContent:action.payload.content,
            }
        case EDITCOMPLETE :
            const index = state.scripts.findIndex((script) => script.id === action.payload.id);
            const piece = state.scripts[index];
            piece.content = action.payload.content;
            return {
                ...state,
                scripts:[...state.scripts.slice(0,index), piece, ...state.scripts.slice(index+1,state.scripts.length)],
                editedContent:action.payload.content,
            }
        default : 
            return state
    }
}