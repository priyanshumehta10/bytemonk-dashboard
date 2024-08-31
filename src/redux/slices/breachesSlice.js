import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    filteredData: [],
    users: [],
    categories: [],
    loading: false,
};

const breachesSlice = createSlice({
    name: 'breaches',
    initialState,
    reducers: {
        fetchDataRequest: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.data = action.payload;
            state.filteredData = action.payload;
            state.loading = false;
            state.users = [...new Set(action.payload.map(item => item.user))];
            state.categories = [...new Set(action.payload.map(item => item.category))];
        },
        fetchDataFailure: (state) => {
            state.loading = false;
        },
        filterByUser: (state, action) => {
            state.filteredData = state.data.filter(item => item.user === action.payload);
        },
        filterByCategory: (state, action) => {
            state.filteredData = state.data.filter(item => item.category === action.payload);
        },
    },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure, filterByUser, filterByCategory } = breachesSlice.actions;

export default breachesSlice.reducer;
