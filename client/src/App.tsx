import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Dashboard from './components/nav-bar/dashboard/Dashboard';
import MainPage from './components/main-page/MainPage';
import Footer from './components/footer/Footer';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:5001/api/post/list')
      .then(response => {
        setPosts(response.data);
      });
  }, []);

  return (
    <>
      <Dashboard></Dashboard>
      <MainPage></MainPage>
      <Footer></Footer>
    </>
  );
}

export default App;
