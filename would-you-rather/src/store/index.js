import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../slices/usersSlice";
import logger from "../middlewares/logger";
import questionSlice from "../slices/questionSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        questions: questionSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
