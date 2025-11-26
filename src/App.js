
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Register from './Components/Register/Register';
import ChatScreen from './Components/ChatScreen/ChatScreen';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/chat' element={<ChatScreen/>} />
      

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
