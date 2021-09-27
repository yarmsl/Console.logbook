import { OPEN_SNACKBAR, RESET_SNACKBAR } from "../../lib/constants";

const initState: snackBarModel = {
		open: false,
		type: undefined,
		message: '',
	};

const snackBarReducer = (state = initState, action: snackBarActions): snackBarModel => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return action.snackBar || state;
	case RESET_SNACKBAR: 
		return initState;
    default:
      return state;
  }
};

export default snackBarReducer;