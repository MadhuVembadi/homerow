import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


//http post req to login user
export const userLogin = createAsyncThunk('loginuser', async (userCred, thunkAPI) => {

    let response = await axios.post('/user/login', userCred);
    let data = response.data;
    if (data.message == 'login successful') {

        //store token in local storage
        localStorage.setItem("token", data.payload);
        return data.user;

    }
    else if (data.message == 'user not found' || data.message == 'Incorrect Password') {
        return thunkAPI.rejectWithValue(data);
    }
})

//http put request to add result to the user history
export const addResult = createAsyncThunk('addResult', async (resObj, thunkAPI) => {

    let response = await axios.put('/result/add', resObj);

    let data = response.data;

    if (data.message == 'Test saved') {
        return data.user;
    }
    else {
        return thunkAPI.rejectWithValue(data);
    }
})

//http put req to update details
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

//http req to erase user data
export const dataErase = createAsyncThunk("DataErase", async (username, thunkAPI) => {

    let response = await axios.put('/user/erase', username);

    let data = response.data;

    if (data.message == "success") {
        return data.user;
    }
    else {
        return thunkAPI.rejectWithValue(data);
    }
})

//http req to delete user
export const deleteUser = createAsyncThunk("userDelete", async (username, thunkAPI) => {

    console.log(username);
    let url = "/user/delete-user/" + username.username;
    let response = await axios.delete(url);

    let data = response.data;

    if (data.message == "success") {
        return data.user;
    }
    else {
        return thunkAPI.rejectWithValue(data);
    }

});


const userSlice = createSlice({
    name: "user",
    initialState: {
        userObj: {},
        isError: false,
        isSuccess: false,
        isLoading: false,
        errMsg: '',
        isResError: false,
        isResSuccess: false,
        isResLoading: false,
        resErrMsg: '',
        isUpdateError: false,
        isUpdateSuccess: false,
        isUpdateLoading: false,
        updateErrMsg: '',
        isEraseError: false,
        isEraseSuccess: false,
        isEraseLoading: false,
        eraseErrMsg: '',
        isDeleteError: false,
        isDeleteSuccess: false,
        isDeleteLoading: false,
        deleteErrMsg: ''
    },
    reducers: {
        clearLoginStatus: (state, action) => {
            state.userObj = null;
            state.isError = false;
            state.errMsg = '';
            state.isLoading = false;
            state.isSuccess = false;
            return state;
        },
        clearMessage: (state, action) => {
            state.isResError = false;
            state.isResSuccess = false;
            state.isResLoading = false;
            state.resErrMsg = '';
            state.isUpdateError = false;
            state.isUpdateSuccess = false;
            state.isUpdateLoading = false;
            state.updateErrMsg = '';
            state.isEraseError = false;
            state.isEraseSuccess = false;
            state.isEraseLoading = false;
            state.eraseErrMsg = '';
            state.isDeleteError = false;
            state.isDeleteSuccess = false;
            state.isDeleteLoading = false;
            state.deleteErrMsg = '';
            return state;
        }
    },
    extraReducers: {
        //track life cycle of promise returned by createAsyncThunk function

        [userLogin.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.errMsg = '';
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.errMsg = '';
            state.userObj = action.payload;
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.errMsg = action.payload.message;
        },
        [addResult.pending]: (state, action) => {
            state.isResLoading = true;
            state.isResError = false;
            state.isResSuccess = false;
            state.resErrMsg = '';
        },
        [addResult.fulfilled]: (state, action) => {
            state.isResLoading = false;
            state.isResError = false;
            state.isResSuccess = true;
            state.resErrMsg = '';
            state.userObj = action.payload;
        },
        [addResult.rejected]: (state, action) => {
            state.isResLoading = false;
            state.isResError = true;
            state.isResSuccess = false;
            state.resErrMsg = action.payload.message;
        },
        [updateDetails.pending]: (state, action) => {
            state.isUpdateLoading = true;
            state.isUpdateError = false;
            state.isUpdateSuccess = false;
            state.updateErrMsg = '';
        },
        [updateDetails.fulfilled]: (state, action) => {
            state.isUpdateLoading = false;
            state.isUpdateError = false;
            state.isUpdateSuccess = true;
            state.updateErrMsg = '';
            state.userObj = action.payload;
        },
        [updateDetails.rejected]: (state, action) => {
            state.isUpdateLoading = false;
            state.isUpdateError = true;
            state.isUpdateSuccess = false;
            state.updateErrMsg = action.payload.message;
        },
        [dataErase.pending]: (state, action) => {
            state.isEraseLoading = true;
            state.isEraseError = false;
            state.isEraseSuccess = false;
            state.eraseErrMsg = '';
        },
        [dataErase.fulfilled]: (state, action) => {
            state.isEraseLoading = false;
            state.isEraseError = false;
            state.isEraseSuccess = true;
            state.eraseErrMsg = '';
            state.userObj = action.payload;
        },
        [dataErase.rejected]: (state, action) => {
            state.isEraseLoading = false;
            state.isEraseError = true;
            state.isEraseSuccess = false;
            state.eraseErrMsg = action.payload.message;
        },
        [deleteUser.pending]: (state, action) => {
            state.isDeleteLoading = true;
            state.isDeleteError = false;
            state.isDeleteSuccess = false;
            state.deleteErrMsg = '';
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isDeleteLoading = false;
            state.isDeleteError = false;
            state.isDeleteSuccess = true;
            state.deleteErrMsg = '';
            state.isSuccess = false;
            state.isLoading = false;
            state.isError = false;
            state.errMsg = '';
            state.userObj = action.payload;
        },
        [deleteUser.rejected]: (state, action) => {
            state.isDeleteLoading = false;
            state.isDeleteError = true;
            state.isDeleteSuccess = false;
            state.deleteErrMsg = action.payload.message;
        }
    }
})

export const { clearLoginStatus, clearMessage } = userSlice.actions;
export default userSlice.reducer;
