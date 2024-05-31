//import { useState } from 'react'

//import viteLogo from '/vite.svg'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './core/assets/styles/custom.scss'
import './app.scss';
import Routes from './Routes';

function App() {
  //const [count, setCount] = useState(0)
return (
    <>
    <Routes />
    <ToastContainer />
    </>
  );


  /*return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
         <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
}

export default App
