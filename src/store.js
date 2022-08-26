import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './Slices/resultSlice'

export const store = configureStore({
    reducer: {
        result: resultReducer
    }
})

