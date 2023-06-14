import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/main-page/MainPage';
import Footer from './components/footer/Footer';
import WorkspacePage from './components/workspace-page/WorkspacePage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/workspace" element={<WorkspacePage />}/>
      </Routes>
    </Router>
    <Footer />
    </>
  );
}

export default App;
