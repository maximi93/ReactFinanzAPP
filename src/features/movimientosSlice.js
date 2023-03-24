import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movimientos: []
}

export const movimientosSlice = createSlice({
    name: "movimientos",
    initialState,
    reducers: {
        guardarMovimientos: (state, action) => {
            state.movimientos = action.payload;
  
        },

        agregarMovimiento: (state, action) => {
            console.log(action);
            //immer
            state.movimientos.push(action.payload);
            console.log(state.movimientos);
        }
    }
});

export const { agregarMovimiento, guardarMovimientos } = movimientosSlice.actions;
export default movimientosSlice.reducer;