import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../utils/api";
import { getUsers } from "./usersSlice";

export const getQuestions = createAsyncThunk("questions/getQuestions", async () => {
    return await api.getQuestions();
})

export const saveQuestion = createAsyncThunk("questions/saveQuestion", async (question, thunkAPI) => {
    const result = await api.saveQuestion(question);
    await thunkAPI.dispatch(getUsers());
    return result;
})

export const saveQuestionAnswer = createAsyncThunk("questions/saveQuestionAnswer", async (answer, thunkAPI) => {
    const result = await api.saveQuestionAnswer(answer);
    await thunkAPI.dispatch(getUsers());
    return result;
})

const initialState = {
    listQuestion: undefined,
}

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuestions.fulfilled, (state, action) => {
            state.listQuestion = action.payload;
            state.loading = false;
        })
        .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
			const { authedUser, qid, answer } = action.meta.arg;
			state.listQuestion = {
				...state.listQuestion,
				[qid]: {
					...state.listQuestion[qid],
					[answer]: {
						...state.listQuestion[qid][answer],
						votes: state.listQuestion[qid][answer].votes.concat([authedUser]),
					},
				},
			};
		})
        .addCase(saveQuestion.fulfilled, (state, action) => {
            state.listQuestion = {
                ...state.listQuestion,
                [action.payload.id]: action.payload
            }
        })
    }
})

const { reducer } = questionSlice;
export default reducer;