import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { selectUser } from './slices/user.slice';
import NeedSignInPage from './pages/NeedSignIn';

function App() {

  const user = useSelector(selectUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dang-ky" element={<SignUp />} />
        <Route path="/trang-chu" element={user?.userId ? <Home /> : <NeedSignInPage /> } />
      </Routes>
    </>
  );
}

export default App;
