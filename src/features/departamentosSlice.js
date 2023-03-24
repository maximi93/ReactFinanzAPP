import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departamentos: []
}

export const departamentosSlice = createSlice({
    name: "departamentos",
    initialState,
    reducers: {
        guardarDepartamentos: (state, action) => {
            state.departamentos = action.payload;
        }
    }
});

export const { guardarDepartamentos } = departamentosSlice.actions;
export default departamentosSlice.reducer;