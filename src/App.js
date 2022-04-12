import logo from './logo.svg';
import './App.css';
import SignInWorker from './SignInWorker';
import { Route, Routes } from 'react-router-dom';
import ClientOrWorker from './ClientOrWorker';
import SignInClient from './SignInClient';
import SignUp from './SignUp'
import HomeManager from './HomeManager';
import EmployeesPage from './EmployeesPage/EmployeesPage';
import AddEmployee from './EmployeesPage/AddEmployee';
import EmployeeRemove from './EmployeesPage/EmployeeRemove';
import EmployeeEdit from './EmployeesPage/EmployeeEdit';
import VehiclesPage from './VehiclesPage/VehiclesPage';
import VehiclesAdd from './VehiclesPage/VehiclesAdd';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ClientOrWorker />} />
        <Route path='/signInWorker' element={<SignInWorker />} />
        <Route path='/signInClient' element={<SignInClient />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/HomeManager' element={<HomeManager />} />
        <Route path='/EmployeesPage' element={<EmployeesPage />} />
        <Route path='/AddEmployee' element={<AddEmployee />} />
        <Route path='/EmployeeRemove' element={<EmployeeRemove />} />
        <Route path='/EmployeeEdit' element={<EmployeeEdit/>}/>
        <Route path='/VehiclesPage' element={<VehiclesPage/>}/>
        <Route path='/VehiclesAdd' element={<VehiclesAdd/>}/>
      </Routes>

    </div>
  );
}

export default App;
