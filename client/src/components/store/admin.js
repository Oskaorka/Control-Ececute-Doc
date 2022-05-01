import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";

const adminSlice = createSlice({
    name: "admins",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        adminRequested: (state) => {
            state.isLoading = true;
        },
        adminReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        adminRequesteField: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});
const { reducer: adminReducer, actions } = adminSlice;
const { adminRequested, adminReceved, adminRequesteField } = actions;

export const getAdmin = () => (state) => state.admins.entities;
export const getAdminLoadimgStatus = () => (state) => state.admins.isLoading;

export const loadAdminList = () => async (dispatch, getState) => {
    dispatch(adminRequested());
    try {
        const { content } = await authService.login();
        dispatch(adminReceved(content));
    } catch (error) {
        dispatch(adminRequesteField(error.message));
    }
};

export default adminReducer;
