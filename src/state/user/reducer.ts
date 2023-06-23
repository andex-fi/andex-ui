import { createReducer } from '@reduxjs/toolkit'
import {
  toggleTheme,
} from './actions'

export interface UserState {
  isDark: boolean
}

export const initialState: UserState = {
  isDark: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark
    })
)
