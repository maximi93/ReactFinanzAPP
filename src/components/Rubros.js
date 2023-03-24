import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { seleccionarRubro } from '../features/rubrosSlice';
import { useOutletContext } from "react-router-dom";


const Rubros = ({tipoRubro}) => {

    const dispatch = useDispatch();

    const rubros = useSelector(state => state.rubros.rubros);
    
    const rubroElegido = useRef(null);

    const [cargarRubros] = useOutletContext();

    const seleccionarRubroHandler = () =>{
        dispatch(seleccionarRubro(rubroElegido.current.value))
    }

    useEffect(() => {
        cargarRubros();
    }, [])




    return (

        <div className="form-group col-md-8 ">
            <label htmlFor="inputRubro">Rubro</label>
            <select id="inputRubro" className="form-control" onChange={seleccionarRubroHandler} ref={rubroElegido}>
                <option key={-1} value={-1}>Seleccione un rubro...</option>
                {rubros.map(rubro => rubro.tipo===tipoRubro && <option key={rubro.id} value={rubro.id}>{rubro.nombre}</option>)}
            </select>

        </div>
    )
}

export default Rubros