import Homepage from "./Homepage";
import Order from "./Order";
import ViewOrder from "./ViewOrder";
import ConfirmOrder from "./ConfirmOrder";
import GetOrder from "./GetOrder";
import User from "./User";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User/>}/>
        <Route path="/home" element={<Homepage/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/vieworder" element={<ViewOrder/>}/>
        <Route path="/confirmorder" element={<ConfirmOrder/>}/>
        <Route path="/getorder" element={<GetOrder/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
