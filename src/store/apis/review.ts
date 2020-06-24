import {http} from '.';
import {ScriptProps} from '../modules/ReviewScript';
import {InitialType} from '../modules/ReviewSuggestions';

type AxiosProps = {}

export const getScriptAPI = async():Promise<ScriptProps> => {
    const response = await http.get('/script');
    return response.data;
}  

export const getSuggestionAPI = async():Promise<InitialType> => {
    const response = await http.get('/suggestions');
    return {
        filler_word_message:response.data.filler_word_message,
        filler_word_percent:response.data.filler_word_percent,
        list_top_50:response.data.list_top_50,
        message:response.data.message,
        sub_message:response.data.sub_message,
        success:response.data.success,
        synonym_list:response.data.synonym_list,
    }
}