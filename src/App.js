import logo from './logo.svg';
import "./bootstrap.min.css"
import Login from './components/Login';
import './App.css';
import Registro from './components/Registro';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';

import Movimientos from './components/Movimientos';
import MontosTotales from './components/MontosTotales';
import Analisis from './components/Analisis';
import AgregarMovimiento from './components/AgregarMovimiento';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='registro' element={<Registro />} />

          <Route path='/' element={<Dashboard />}>
            <Route path='/' element={<Home/>}/>
            <Route path='agregargasto' element={<AgregarMovimiento tipo="gasto" />} />
            <Route path='agregaringreso' element={<AgregarMovimiento tipo="ingreso" />} />
            <Route path='movimientos' element={<Movimientos />} />
            <Route path='totales' element={<MontosTotales />} />
            <Route path='analisis' element={<Analisis />} />

          </Route>
          <Route path='*' element={<NotFound />}/>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
