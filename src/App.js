import React, { useState, Fragment, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

const App = () => {

  //cargar las citas de localStorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if (!citasIniciales) {
    citasIniciales = []
  }

  const [citas, setCitas] = useState(citasIniciales)
  
  //Agregar las nuevas citas al state
  const crearCita = cita => {
    const nuevasCitas = [...citas, cita]
    setCitas(nuevasCitas)

  }

  //Elimina las citas del State
  const eliminarCita = (index) => {
    const nuevasCitas = [...citas]
    nuevasCitas.splice(index, 1)
    setCitas(nuevasCitas)
  }

  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'))

      if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas))
      } else {
        localStorage.setItem('citas', JSON.stringify([]))
      }

    },[citas])

  //Cargar Condicionalmente un Titulo
  const titulo = Object.keys(citas).length === 0 ? 'No Hay Citas' : 'Administrar las Citas Aqui'

  return (
    <Fragment>
      <h1>Administracion de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(
              (cita, index) => (
                <Cita
                  key={index}
                  index={index}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}


export default App;
