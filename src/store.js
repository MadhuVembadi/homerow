import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './Slices/resultSlice'
import userReducer from './Slices/userSlice'
import manualReducer from './Slices/manualSlice'

export const store = configureStore({
    reducer: {
        result: resultReducer,
        user: userReducer,
        manual: manualReducer
    }
})

