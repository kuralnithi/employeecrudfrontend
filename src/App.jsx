import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';

import './App.css'
import Login from './Components/userlogin/Login'
import { store } from './Features/Store';
import ResetPasswordpage from './Components/userlogin/ResetPasswordpage';
import EmployeePage from './Components/employeepage/EmployeePage';

function App() {

  return (
    <>
      <div className="container">
        
<Provider store={store}>
<Routes>

<Route path='/'  element={<Login/>}  />
<Route path='/Preset'  element={<ResetPasswordpage/>}  />
<Route path='/employeepage'  element={<EmployeePage/>}  />

</Routes>
</Provider>


      </div>
    </>
  )
}

export default App
