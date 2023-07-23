import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './Components/Home';
import Customer from './Components/Customer';
import Invoice from './Components/Invoices';
import Items from './Components/Items';
import NavBar from './Components/Navbar';
import NewCustomer from './Components/NewCustomer';
import NewItem from './Components/NewItem';
import NewInvoice from './Components/NewInvoice';
import InvoicePreview from './Components/InvoicePreview';


function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customer' element={< Customer />} />
          <Route path = '/customer/new' element = {<NewCustomer />} />
          <Route path='/items' element={<Items />} />
          <Route path = '/items/new' element = {<NewItem />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/invoice/new' element={<NewInvoice />} />
          <Route path='invoice/preview/:id' element={<InvoicePreview/>} />
        </Routes>
      </div>
    </Router>


  );
}

export default App;
