import { Fragment } from 'react'
import { MARCAS, YEARS, PLANES } from '../constants'
import useCotizador from '../hooks/useCotizador'
import Error from './Error'

function Formulario () {
  const { datos, handleChange, error, setError, cotizarSeguro } = useCotizador()
  const handleSubmit = e => {
    e.preventDefault()
    if (Object.values(datos).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }
    setError('')
    // TODO: Cotizar
    cotizarSeguro()
  }
  return (
    <>
      {error && <Error />}
      <form onSubmit={handleSubmit}>
        <div className='my-5'>
          <label htmlFor='' className='block mb-3 font-bold uppercase'>
            Marca
          </label>
          <select
            name='marca'
            id='maca'
            className='w-full p-3 border border-gray-200'
            onChange={e => handleChange(e)}
            value={datos.marca}
          >
            <option value=''>-- Selecciona Marca --</option>
            {MARCAS.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='my-5'>
          <label htmlFor='' className='block mb-3 font-bold uppercase'>
            Año
          </label>
          <select
            name='year'
            id='maca'
            className='w-full p-3 border border-gray-200'
            onChange={e => handleChange(e)}
            value={datos.year}
          >
            <option value=''>-- Selecciona un Año --</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className='my-5'>
          <label htmlFor='' className='block mb-3 font-bold uppercase'>
            Planes
          </label>
          <div className='flex gap-3 items-center'>
            {PLANES.map((plan) => (
              <Fragment key={plan.id}>
                <label htmlFor={plan.id}>{plan.nombre}</label>
                <input type='radio' name='plan' id={plan.id} value={plan.id} onChange={e => handleChange(e)} />
              </Fragment>
            ))}
          </div>
        </div>
        <input type='submit' className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold' value='Cotizar' />
      </form>
    </>
  )
}

export default Formulario
