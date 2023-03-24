import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dpto: null,
    ciudadSeleccionada:null
}

export const ciudadesSlice = createSlice({
    name: "ciudades",
    initialState,
    reducers: {
        seleccionarDpto: (state, action) => {
            state.dpto = action.payload;
        },

        seleccionarCiudad: (state, action) => {
            state.ciudadSeleccionada = action.payload;
        }
    }
});

export const { seleccionarDpto, seleccionarCiudad } = ciudadesSlice.actions;
export default ciudadesSlice.reducer;