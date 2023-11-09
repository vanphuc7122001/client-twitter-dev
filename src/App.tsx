import useRoutesElement from './useRoutesElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routesElement = useRoutesElement()
  return (
    <>
      <div>{routesElement}</div>
      <ToastContainer />
    </>
  )
}

export default App
