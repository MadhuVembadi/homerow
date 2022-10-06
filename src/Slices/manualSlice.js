import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const updateDetails = createAsyncThunk("updateEmail", async (newDetails, thunkAPI) => {

    let response = await axios.put('/user/update-user', newDetails);

    let data = response.data;

    if (data.message == "User details updated") {
        return data.user;
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }

})

const manualSlice = createSlice({
    name: "manual",
    initialState: {
        testTime: 30
    },
    reducers: {

        setTimer: (state, action) => {
            state.testTime = action.payload;
            return state;
        }

    },
    extraReducers: {
        
    }
})

export const { setTimer } = manualSlice.actions;
export default manualSlice.reducer;