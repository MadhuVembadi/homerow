import { createSlice } from '@reduxjs/toolkit'

const resultSlice = createSlice({
    name: "result",
    initialState: [],
    reducers: {
        currResult: (state, actionObj) => {
            state[0] = actionObj.payload;
        }
    }
})

export const { currResult } = resultSlice.actions;
export default resultSlice.reducer;