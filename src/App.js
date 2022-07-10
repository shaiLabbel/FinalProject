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
import VehiclesRemove from './VehiclesPage/VehiclesRemove';
import VehiclesEdit from './VehiclesPage/VehiclesEdit';
import OrderCreation from './OrderCreation/OrderCreation';
import Pickup from './OrderCreation/Pickup';
import ShowOrder from './OrderCreation/ShowOrder';
import ManagmentPage from './OrderManagment/ManagmentPage'
import SchedulePage from './WorkSchedule/SchedulePage';
import ManageOrder from './ManageOrder';
import SidurAvoda from './SidurAvoda';
import BidUpdate from './OrderManagment/BidUpdate';

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
        <Route path='/VehiclesRemove' element={<VehiclesRemove/>}/>
        <Route path='/VehiclesEdit' element={<VehiclesEdit/>}/>
        <Route path='/OrderCreation' element={<OrderCreation/>}/>
        <Route path='/PickUp' element={<Pickup/>}/>
        <Route path='/ShowOrder' element={<ShowOrder/>}/>
        <Route path='/ManagmentPage' element={<ManagmentPage/>}/>
        <Route path='/SchedulePage' element={<SchedulePage/>}/>
        <Route path='/ManageOrder' element={<ManageOrder/>}/>
        <Route path='/SidurAvoda' element={<SidurAvoda/>}/>
        <Route path='/BidUpdate' element={<BidUpdate/>}/>
        
      </Routes>

    </div>
  );
}

export default App;
