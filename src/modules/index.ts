import {combineReducers} from 'redux';
import script from './ReviewScript';

const rootReducer = combineReducers({
    script
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;