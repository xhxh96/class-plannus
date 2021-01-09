const classesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLASS':
      return action.payload;
    default:
      return state;
  }
};

export default classesReducer;
