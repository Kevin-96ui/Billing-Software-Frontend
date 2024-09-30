// userReducer.js
const initialState = {
  userData: null,  // Initialize as null or {} if userData is expected to be an object
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
