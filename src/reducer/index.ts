import { combineReducers } from 'redux';
import classesReducer from './classesReducer';

export default combineReducers({ classes: classesReducer });
