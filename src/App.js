import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import Login from './modules/login/Login';
import Admin from './components/Admin';
import DashBoard from './components/DashBoard';

import Channels from './modules/channels/Channel';
import AddChannel from './modules/channels/AddChannel';

import Topics from './modules/topics/Topics';
import AddTopic from './modules/topics/AddTopic';

import Users from './modules/users/Users';
import NormalUser from './components/User';
import Demo from './components/Demo';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/admin/*' element={<Admin />}>
          <Route path='' element={<DashBoard />}></Route>
          <Route path='channels' >
            <Route path='' element={<Channels />}></Route>
            <Route path='addChannel' element={<AddChannel />}></Route>
          </Route>
          <Route path='topics'>
            <Route path='' element={<Topics />}></Route>
            <Route path='addTopic' element={<AddTopic />}></Route>
          </Route>
          <Route path='users' element={<Users />}></Route>
        </Route>
        <Route path='/user/*' element={<Demo />}>

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
