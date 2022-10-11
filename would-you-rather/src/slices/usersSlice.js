import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../utils/api";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    return await api.getUsers();
})

const initialState = {
    listUser: undefined,
    loading: false,
    receiveUser: undefined,
    isAuth: false
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        authedUser: (state, action) => {
            state.receiveUser = state.listUser[action.payload];
            state.isAuth = true;
        },
        unAuthedUser: (state) => {
            state.receiveUser = undefined;
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.listUser = action.payload;
                state.loading = false;
            })
            .addCase(getUsers.rejected, (state) => {
                state.loading = false;
            })
    }
});

const { actions, reducer } = usersSlice;
export const { authedUser, unAuthedUser } = actions;
export default reducer;