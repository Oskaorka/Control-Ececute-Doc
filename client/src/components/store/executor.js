import { createSlice } from "@reduxjs/toolkit";
import executorService from "../service/executorService";

const executorSlice = createSlice({
    name: "executors",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        executorRequested: (state) => {
            state.isLoading = true;
        },
        executorReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        executorRequestField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});
const { reducer: executorReducer, actions } = executorSlice;

const { executorRequested, executorReceved, executorRequestField } = actions;

export const getExecutor = () => (state) => state.executors.entities;
export const getExecutorLoadingStatus = () => (state) =>
    state.executors.isLoading;

export const loadExecutorList = () => async (dispatch, getState) => {
    // const { lastFetch } = getState().executors;
    dispatch(executorRequested());
    try {
        const { content } = await executorService.get();
        // console.log(content);
        dispatch(executorReceved(content));
    } catch (error) {
        dispatch(executorRequestField(error.message));
    }
};

export default executorReducer;
