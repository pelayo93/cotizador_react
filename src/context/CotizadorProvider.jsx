import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({ children }) => {
  CotizadorProvider.propTypes = {
    children: PropTypes.node
  }
  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: ''
  })
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(0)
  const [cargando, setCargando] = useState(false)

  const handleChange = e => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }
  const cotizarSeguro = () => {
    // Una Base
    let resultado = 2000
    // Obtener la Diferencia de Años
    const diferencia = obtenerDiferenciaYear(datos.year)
    // Cada año de diferencia hay que reducir 3% del precio del seguro
    // Hay que restar el 3% por cada año
    resultado -= ((diferencia * 3) * resultado) / 100
    // Europeo 30%
    // Americano 15%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca)

    // Basico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan)
    // Formatear Dinero
    resultado = formatearDinero(resultado)
    setCargando(true)
    setTimeout(() => {
      setResultado(resultado)
      setCargando(false)
    }, 3000)
  }
  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChange,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  )
}
export { CotizadorProvider }

export default CotizadorContext
