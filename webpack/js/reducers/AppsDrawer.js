// import {
//     APPS_LIST_APP_SAVED,
//     APPS_LIST_CLOSE_DRAWERS,
//     APPS_LIST_REGISTER_OPEN_DRAWER,
//     APPS_LIST_SET_AVAILABLE_LABS,
//     APPS_LIST_SET_ERROR_MESSAGE,
//     APPS_LIST_TOGGLE_SCOPE,
//     APPS_LIST_UPDATE_FORM_ELEMENT
// } from "../constants";
// import {APPS_LIST_EDIT_OPEN_DRAWER} from "../constants/action_types";
// import {ADD_MODE, EDIT_MODE} from "../constants/form_mode";
//
// /**
//  * @type AppsDrawerState
//  */
// export const appsDrawerInitialState = {
//     drawer_open: false,
//     available_labs: [],
//     error_message: {
//         message: "",
//         field: ""
//     },
//     form: {
//         mode: ADD_MODE,
//         client_id: 0,
//         name: "",
//         description: "",
//         _redirect_uris: "",
//         lab__id: -1,
//         selected_scopes: [],
//         sign_in: false
//     }
// };
//
// export function appsDrawerReducer(state, action) {
//     switch (action.type) {
//         case APPS_LIST_APP_SAVED:
//         case APPS_LIST_CLOSE_DRAWERS:
//             return appsDrawerInitialState;
//
//         case APPS_LIST_REGISTER_OPEN_DRAWER:
//             return {
//                 ...state,
//                 drawer_open: true,
//                 form: {
//                     ...state.form,
//                     mode: ADD_MODE
//                 }
//             }
//
//         case APPS_LIST_EDIT_OPEN_DRAWER:
//             return {
//                 ...state,
//                 drawer_open: true,
//                 form: {
//                     mode: EDIT_MODE,
//                     name: action.payload.name,
//                     description: action.payload.description,
//                     lab__id: action.payload.lab_id,
//                     sign_in: action.payload.allow_sign_in,
//                     _redirect_uris: action.payload.redirect_uris,
//                     selected_scopes: action.payload.selected_scopes
//                 }
//             }
//
//         case APPS_LIST_SET_AVAILABLE_LABS:
//             return {
//                 ...state,
//                 available_labs: action.payload.labs
//             };
//
//         case APPS_LIST_UPDATE_FORM_ELEMENT:
//             return (() => {
//                 let item = {};
//                 item[action.payload.name] = action.payload.value;
//
//                 return {
//                     ...state,
//                     form: {
//                         ...state.form,
//                         ...item
//                     }
//                 }
//             })();
//
//         case APPS_LIST_TOGGLE_SCOPE:
//             return (() => {
//                 const scopeIndex = state.form.selected_scopes.indexOf(action.payload);
//                 let newScopes;
//                 if (scopeIndex > -1) {
//                     newScopes = state.form.selected_scopes
//                         .slice(0, scopeIndex)
//                         .concat(state.form.selected_scopes.slice(scopeIndex + 1));
//                 } else {
//                     newScopes = state.form.selected_scopes
//                         .slice()
//                         .concat([action.payload]);
//                 }
//
//                 return {
//                     ...state,
//                     form: {
//                         ...state.form,
//                         selected_scopes: newScopes
//                     }
//                 };
//             })();
//
//         case APPS_LIST_SET_ERROR_MESSAGE:
//             return {
//                 ...state,
//                 error_message: action.payload
//             };
//         default:
//             return state;
//     }
// }