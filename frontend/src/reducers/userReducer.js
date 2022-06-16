export function userReducer(state = null, action) {
  switch (action.type) {
    // send a payload after the user has authenticated
    case 'LOGIN':
      return action.payload;

    default: //return normal by default
      return state;
  }
}
