import logo from './logo.svg';
import './App.css';
import MainContainer from './Components/Main/MainContainer';
import Contacts from './Components/Contacts/Contects';
import ShopContainer from './Components/Shop/ShopContainer';
import AdminContainer from './Components/Admin/AdminContainer';
import AdminLoginContainer from './Components/Admin/AdminLoginContainer';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const authState = useSelector(state => state.authReduser.isAuth)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <MainContainer />} />
        {authState ? <Route path="/admin" element={ <AdminContainer />} /> : <Route path="/admin" element={ <AdminLoginContainer />} />}
        <Route path="/admin_login" element={ <AdminLoginContainer />} />
        <Route path="/shop" element={ <ShopContainer />} />
        <Route path="/contacts" element={ <Contacts  />} />
      </Routes>
    </div>
  );
}

export default App;
