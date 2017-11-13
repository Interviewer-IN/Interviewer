import {combineReducers} from 'redux';
import notifications from './notifications';
import project from './project';
import sideBar from './sideBar';
import authentication from './authentication';
import vacancies from './vacancies';
import levels from './levels'
import positions from './positions'
import interviews from './interviews'
import ratings from './ratings'
import candidates from './candidates'
import interviewers from './interviewers'
import questions from './questions'


export default combineReducers({
    project,
    notifications,
    sideBar,
    authentication,
    vacancies,
    levels,
    positions,
    interviews,
    ratings,
    candidates,
    interviewers,
    questions
})