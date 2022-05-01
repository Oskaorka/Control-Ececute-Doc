import { createAction, createSlice } from "@reduxjs/toolkit";
import docDataService from "../service/docService";

const docDataSlice = createSlice({
    name: "docDatas",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
        lengthArr: null,
        dataLoaded: false,
        stateEdit: false
    },
    reducers: {
        docDataRequested: (state) => {
            state.isLoading = true;
        },
        docDataReceved: (state, action) => {
            state.entities = action.payload;
            // .filter(e => e.inWork.length > 0);
            state.lastFetch = Date.now();
            state.isLoading = false;
            state.length = action.payload.length;
            state.dataLoaded = true;
        },
        docDataRequesField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        docDataCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        docDataUpdateSuccessed: (state, action) => {
            //   console.log(action.payload.content._id);
            state.entities[
                state.entities.findIndex(
                    (doc) => doc._id === action.payload._id
                )
            ] = action.payload;
            // state.entities = action.payload;
            // console.log();
        },
        docDataEdit: (state, action) => {
            state.stateEdit = action.payload;
        }

    }
});

const { reducer: docDatasReducer, actions } = docDataSlice;

const {
    docDataRequested,
    docDataReceved,
    docDataRequesField,
    docDataCreated,
    docDataUpdateSuccessed,
    docDataEdit
} = actions;

// function isOutdated(date) {
//     if (Date.now() - date > 10 * 60 * 100) {
//         return true;
//     }
//     return false;
// }
const addDocDataRequested = createAction("docDatas/addDocDataRequested");
const addDocDataFailed = createAction("docDatas/addDocDataFailed");
const docDataUpdateFailed = createAction("docDatas/docDataUpdateFailed");
const docDataUpdateRequested = createAction("docDatas/docDataUpdateRequested");

export const getDocData = () => (state) => state.docDatas.entities;
// .filter(e => e.inWork.length > 0);
export const getDocDataLoadingStatus = () => (state) => state.docDatas.isLoading;
export const getCurrentDataEdit = () => (state) => state.docDatas.stateEdit;
    export const createDocData = (payload) => async (dispatch, getState) => {
        // getState().docDatas.dataLoaded = true;
        // console.log(getState());
        // console.log(payload);
        dispatch(addDocDataRequested());
        const getId = Date.parse(new Date());
        const executorName = payload.nameExecutor.map((q) => q.value);
        const convertTime = (time) => {
            return time.split("-").reverse().join(".");
        };
        const newData = {
            ...payload,
            id: getId,
            executorName,
            inWork: executorName,
            dateDoc: convertTime(payload.dateDoc),
            periodOfExecution: convertTime(payload.periodOfExecution)
        };
        // console.log(newData);
        try {
            const { content } = await docDataService.create(newData);
            // console.log(content);
            dispatch(docDataCreated(content));
            // if (content) {
            //     const { content2 } = await docDataService.get();
            //     // console.log(content);
            //     dispatch(docDataReceved(content2));
            // }
        } catch (error) {
            dispatch(addDocDataFailed(error.message));
        }
    };
    export const updateDocData = (payload) => async (dispatch) => {
        dispatch(docDataUpdateRequested());
        // console.log(payload);
        dispatch(docDataEdit(payload));
        try {
            const { content } = await docDataService.update(payload);
            // console.log(content);
            if (content.inWork.length === 0) {
                const { content } = await docDataService.get();
                dispatch(docDataReceved(content));
                // console.log(content);
                // add test function in if, for reset data in state.entities
            };
            dispatch(docDataUpdateSuccessed(content));
            // console.log(payload);
            // history.push(`/login`);
        } catch (error) {
            dispatch(docDataUpdateFailed(error.message));
        }
    };
export const loadDocDataList = () => async (dispatch, getState) => {
    // const { lastFetch } = getState().docDatas;
    // console.log(lastFetch);
    // if (isOutdated(lastFetch)) {

    dispatch(docDataRequested());
    try {
        const { content } = await docDataService.get();
        // const newData = [...content.filter(e => e.inWork.length > 0)];
        // console.log(newData);
        dispatch(docDataReceved(content));
    } catch (error) {
        dispatch(docDataRequesField(error.message));
    }
    // }
};

export const getDataStatus = () => (state) => state.docDatas.dataLoaded;
export default docDatasReducer;
