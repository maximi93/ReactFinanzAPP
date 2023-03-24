import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rubros: [],
    rubro: null
}

export const rubrosSlice = createSlice({
    name: "rubros",
    initialState,
    reducers: {
        guardarRubros: (state, action) => {
            state.rubros = action.payload;
        },
        seleccionarRubro: (state,action) =>{
            state.rubro = action.payload;
        }
    }
});

export const { guardarRubros, seleccionarRubro } = rubrosSlice.actions;
export default rubrosSlice.reducer;