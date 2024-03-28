import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NeedSignInPage from './pages/NeedSignIn';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dang-ky" element={<SignUp />} />
        <Route path="/trang-chu" element={localStorage.getItem("user") ? <Home /> : <NeedSignInPage /> } />
      </Routes>
    </>
  );
}

export default App;
