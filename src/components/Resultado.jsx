import { useMemo, useRef } from 'react'
import useCotizador from '../hooks/useCotizador'
import { MARCAS, PLANES } from '../constants'
function Resultado () {
  const { resultado, datos } = useCotizador()
  const { marca, plan, year } = datos
  // La mejor formad de usar useMemo o useCalback es que useMemo es mejor usarla para un Valor en Cambio useCalback es para una funcion
  // igual puede usarse para ambos pero es mejor usarlo para utilidad que tiene cada una, no usar en excepso el useMemo puede generar problemas
  const [nombreMarca] = useMemo(
    () => MARCAS.filter((m) => m.id === Number(marca)),
    [resultado]
  )
  const [nombrePlanes] = useMemo(
    () => PLANES.filter((p) => p.id === Number(plan)),
    [resultado]
  )
  const yearRef = useRef(year)

  if (resultado === 0) return null
  return (
    <div className='bg-gray-100 text-center mt-5 p-5 shadow'>
      <h2 className='text-gray-700 font-black text-3xl '>Resumen</h2>
      <p className='my-2'>
        <span className='font-bold'>Marca: </span>
        {nombreMarca.nombre}
      </p>
      <p className='my-2'>
        <span className='font-bold'>Planes: </span>
        {nombrePlanes.nombre}
      </p>
      <p className='my-2'>
        <span className='font-bold'>Año del Auto: </span>
        {yearRef.current}
      </p>
      <p className='my-2 text-2xl'>
        <span className='font-bold'>Total Cotizacion: </span>
        {resultado}
      </p>
    </div>
  )
}

export default Resultado
