import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Layout from './components/Layout';
import ManageTrip from './components/ManageTrip';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import Trips from './components/Trips';

const App = () => (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage/>} />
              <Route path="/trips" element={<Trips/>} />
              <Route path="/create" element={<ManageTrip fromCreate={true}/>} />
              <Route path="/edit" element={<ManageTrip/>} />
              <Route path="*" element={<NotFoundPage/>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
);

export default App;
