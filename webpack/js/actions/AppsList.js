// import {
//     APPS_LIST_APP_SAVED,
//     APPS_LIST_CLOSE_DRAWERS,
//     APPS_LIST_REGISTER_OPEN_DRAWER,
//     APPS_LIST_SET_APPS_LIST,
//     APPS_LIST_SET_AVAILABLE_LABS,
//     APPS_LIST_SET_ERROR_MESSAGE,
//     APPS_LIST_SHOW_KEYS_OVERLAY,
//     APPS_LIST_TOGGLE_KEYS_OVERLAY,
//     APPS_LIST_TOGGLE_SCOPE,
//     APPS_LIST_UPDATE_FORM_ELEMENT
// } from "../constants";
// import {APPS_LIST_EDIT_OPEN_DRAWER} from "../constants/action_types";
//
// export function appsListSetAppsList(apps){
//      return {type: APPS_LIST_SET_APPS_LIST, payload: apps};
// }
//
// export function appsListRegisterOpenDrawer() {
//     return {type: APPS_LIST_REGISTER_OPEN_DRAWER};
// }
//
// export function appsListEditOpenDrawer(data) {
//     return {type: APPS_LIST_EDIT_OPEN_DRAWER, payload: data};
// }
//
// export function appsListCloseDrawers() {
//     return {type: APPS_LIST_CLOSE_DRAWERS}
// }
//
// export function appsListSetAvailableLabs(data) {
//     return {type: APPS_LIST_SET_AVAILABLE_LABS, payload: data};
// }
//
// export function appsListUpdateFormElement(name, value) {
//     return {type: APPS_LIST_UPDATE_FORM_ELEMENT, payload: {name, value}}
// }
//
// export function appsListToggleScope(scope) {
//     return {type: APPS_LIST_TOGGLE_SCOPE, payload: scope};
// }
//
// export function setAppRegistrationErrorMessage(error) {
//     return {type: APPS_LIST_SET_ERROR_MESSAGE, payload: error};
// }
//
// export function appsListAppSaved() {
//     return {type: APPS_LIST_APP_SAVED}
// }
//
// export function appsListToggleKeysOverlay() {
//     return {type: APPS_LIST_TOGGLE_KEYS_OVERLAY};
// }
//
// export function appsListShowKeysOverlay(app) {
//     return {type: APPS_LIST_SHOW_KEYS_OVERLAY, payload: app};
// }