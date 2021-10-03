import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppDispatch, RootState } from '../../state/store'

export const useAppDispatch = (): ThunkDispatch<RootState, unknown, AuthActions | userActions | snackBarActions | PostActions> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector