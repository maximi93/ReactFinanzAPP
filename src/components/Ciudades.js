import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { seleccionarCiudad } from '../features/ciudadesSlice';


const Ciudades = () => {
  const dispatch = useDispatch();

  const dpto = useSelector(state => state.ciudades.dpto);
  const city = useRef(null);

  useEffect(() => {
    cargarCiudades();
  }, [dpto])


  const [ciudades, setCiudades] = useState([]);



  const cargarCiudades = e => {

    fetch(`https://dwallet.develotion.com/ciudades.php?idDepartamento=${dpto}`)
      .then(response => response.json())
      .then(result => {

        setCiudades(result.ciudades);
        console.log(result.ciudades);
      })
      .catch(error => console.log('error', error));

  }

  const elegirCiudad = () =>{
      dispatch(seleccionarCiudad(city.current.value));
  }

  return (

    <div className="form-group col-md-5">
      <label htmlFor="inputCiudad">Ciudad</label>

      <select id="inputCiudad" className="form-control" onChange={elegirCiudad} ref = {city}>
        <option key={-1} value={-1} >Seleccione una ciudad...</option>
        {ciudades.map(ciudad => <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>)}
      </select>

    </div>


  )
}

export default Ciudades






