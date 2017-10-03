import { combineReducers } from 'redux'
import notifications from './notifications'
import project from './project'
import sideBar from './sideBar'
import authentication from './authentication'

export default combineReducers({
  project,
  notifications,
  sideBar,
  authentication

})