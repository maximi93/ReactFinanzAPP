import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sesionCaduco: false,
}

export const sesionSlice = createSlice({
    name: "sesion",
    initialState,
    reducers: {
        caducarSesion: (state, action) => {
            console.log(action);
            state.sesionCaduco = action.payload;
        }
    }
});

export const {caducarSesion} = sesionSlice.actions;
export default sesionSlice.reducer;