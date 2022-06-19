import Cookies from 'js-cookie';
export function userReducer(
  state = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  action
) {
  switch (action.type) {
    // send a payload after the user has authenticated
    case 'LOGIN':
      return action.payload;

    default: //return normal by default
      return state;
  }
}
