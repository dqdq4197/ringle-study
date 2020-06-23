import {combineReducers} from 'redux';
import script from './ReviewScript';
import suggestion from './ReviewSuggestions';

const rootReducer = combineReducers({
    script,
    suggestion
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;