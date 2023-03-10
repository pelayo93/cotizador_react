import React, { useState } from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obternerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px; 
`;
const Select= styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover{
        background-color: #26c6da;
        cursor: pointer;
    }
`;

const Error= styled.div`
    background-color: rgba(248, 215, 218, 1);
    border-color: rgba(220, 53, 69, 1);
    color: rgba(114, 28, 36,1);
    border: 1px solid;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen , guardarCargando}) => {

    const [datos, guardarDatos] = useState({
        marca:'',
        year:'',
        plan:''
    })
    const [error, guardarError] = useState(false)

    const{marca, year, plan} = datos;

    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    //cuando el usuario presiona el boton
    const cotizarSeguro = e =>{
        e.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
             guardarError(true);
             return;
        }
        guardarError(false);

        // Base de 2000
        let resultado= 2000;
        //Obtener la Diferencia de años
        const diferencia = obternerDiferenciaYear(year);
      
        // por cada año hay que restar 3%
        resultado -= ((diferencia * 3) * resultado ) /100;
   

        //Americano: 15%
        //Asiatico: 5%
        //Europeo: 30%
        resultado = calcularMarca(marca) * resultado;

        //Basico 20%
        //Completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        guardarCargando(true);

       setTimeout(() => {
        //Elimina el Spinner
        guardarCargando(false);
        // Pasa la informacion al componente principal
         guardarResumen({
            cotizacion: Number(resultado),
            datos
        });
       }, 1800);

       
 
    }

    return ( 

        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son Obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                    <Select
                        name='marca'
                        value={marca}
                        onChange={obtenerInformacion}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="americano">Americano</option>
                        <option value="europeo">Europeo</option>
                        <option value="asiatico">Asiatico</option>
                    </Select>
                

            </Campo>
            <Campo>
                <Label>Año</Label>
                    <Select
                        name='year'
                        value={year}
                        onChange={obtenerInformacion}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                    </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type='radio'
                    name='plan'
                    value='basico'
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                />Basico

                <InputRadio 
                    type='radio'
                    name='plan'
                    value='completo'
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Boton type='submit'>Cotizar</Boton>

        </form>

     );
}

Formulario.propType = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

 
export default Formulario;