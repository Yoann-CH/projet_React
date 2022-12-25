import './App.css';
import AuthUserLogin from './pages/AuthUserLogin/AuthUserLogin';
import AuthUserRegister from './pages/AuthUserRegister/AuthUserRegister';
import Home from './pages/Home/Home';
import {Layout} from 'antd';
import { Routes, Route, Link } from "react-router-dom";
import AuthMenu from './components/AuthMenu/AuthMenu';
import MatchsMenu from './components/AuthMenu/MatchsMenu';
import Matchs from './pages/Matchs/Matchs';
import Match from './pages/Matchs/Match';
const { Header, Content, Footer } = Layout;

function App() {
  return(
    <>
      <Layout>
        <Header class='navbar'>
          <Link to={"/home"}>
            <div class='logo'>
            </div>
          </Link>
          <div>
            <MatchsMenu reloadToken/>
            <AuthMenu reloadToken/>
          </div>
        </Header>
        <Content class="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<AuthUserLogin/>}/>
            <Route path="/register" element={<AuthUserRegister/>} />
            <Route path="/matchs" element={<Matchs />} />
            <Route path="/match/*" element={<Match />} />
            <Route path="*" element={<Home/>} />
          </Routes>
        </Content>
        <Footer class="footer">
          Shifumi ©2022
        </Footer>
      </Layout>
    </>
  );
}

export default App;
