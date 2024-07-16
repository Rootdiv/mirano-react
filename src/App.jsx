import { Header } from '@/modules/Header/Header';
import { Hero } from '@/modules/Hero/Hero';
import { Goods } from '@/modules/Goods/Goods';
import { Filters } from '@/modules/Filters/Filters';
import { Subscription } from '@/modules/Subscription/Subscription';
import { Footer } from '@/modules/Footer/Footer';
import { Order } from '@/modules/Order/Order';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { registerCart, fetchCart } from '@/redux/thunks/cartThunk';

export const App = () => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);

  useEffect(() => {
    const initializeCart = async () => {
      dispatch(registerCart());
      dispatch(fetchCart());
    };
    initializeCart();
  }, [dispatch]);

  const scrollToFilter = () => {
    filterRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header scrollToFilter={scrollToFilter} />
      <main>
        <Hero />
        <Filters filterRef={filterRef} />
        <Goods />
        <Subscription />
      </main>
      <Footer />
      <Order />
    </>
  );
};
