import React, { useState } from 'react'
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

import styled from '@emotion/styled';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid;
  border-color: #fff;

`;

const ContenedorFormulario= styled.div`
  background-color: #fff;
  padding: 3rem;
`;


function App() {
    
  const [resumen,guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  }); 

   const [cargando, guardarCargando] = useState(false); 
  // Extraer Datos
  const { datos, cotizacion } = resumen;


  return (
    <Contenedor>
      <Header 
      titulo='Cotizador de Seguros'

    />
    <ContenedorFormulario>
    <Formulario 
      guardarResumen={guardarResumen}
      guardarCargando={guardarCargando}       
    />
    
      <Resumen 
        datos={datos}
      />
      {
        cargando ? <Spinner /> : null
      }
      
      {!cargando ?  <Resultado cotizacion={cotizacion}/> : null}

     
    </ContenedorFormulario>
    </Contenedor>
    
  );
}

export default App;
