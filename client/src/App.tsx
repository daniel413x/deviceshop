import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  indexPublicRoutes,
} from './utils/arrays';
import Context from './context/context';
import AppRouter from './components/routers/AppRouter';
import Navbar from './components/Navbar/Navbar';
import { stillAuthed } from './http/userAPI';
import Footer from './components/Footer/Footer';
import ScrollWrapper from './components/ScrollWrapper';
import { fetchTypes } from './http/typeAPI';
import Notifications from './components/Notifications/Notifications';
import { GUEST } from './utils/consts';

function App() {
  const {
    user,
    cart,
    types,
  } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const fetchedTypes = await fetchTypes();
        types.setTypes(fetchedTypes);
        const registeredToken = localStorage.getItem('registeredToken');
        if (registeredToken) {
          const { user: fetchedUser, cart: fetchedCart } = await stillAuthed();
          user.set(fetchedUser);
          cart.set(fetchedCart);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          localStorage.removeItem('registeredToken');
        }
      } finally {
        setLoading(false);
      }
    })();
    if (user.isGuest) {
      if (localStorage.getItem('guestItems')) {
        const guestItems = JSON.parse(localStorage.getItem('guestItems')!);
        localStorage.setItem('guestItems', JSON.stringify(guestItems));
        cart.setItems(guestItems);
      }
    }
  }, []);
  useEffect(() => {
    if (user.id !== GUEST) {
      localStorage.removeItem('guestItems');
    }
  }, [user.id]);
  return loading ? null : (
    <Router>
      <ScrollWrapper>
        <Notifications />
        <Navbar />
        <div
          id="main-routes-content"
        >
          <AppRouter
            publicRoutes={indexPublicRoutes}
          />
        </div>
        <Footer />
      </ScrollWrapper>
    </Router>
  );
}

export default App;
