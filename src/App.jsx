import { Header } from '@/modules/Header/Header';
import { Hero } from '@/modules/Hero/Hero';
import { Goods } from '@/modules/Goods/Goods';
import { Filters } from '@/modules/Filters/Filters';
import { Subscription } from '@/modules/Subscription/Subscription';
import { Footer } from '@/modules/Footer/Footer';
import { Order } from '@/modules/Order/Order';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerCart, fetchCart } from '@/redux/cartSlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeCart = async () => {
      dispatch(registerCart());
      dispatch(fetchCart());
    };
    initializeCart();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Filters />
        <Goods />
        <Subscription />
      </main>
      <Footer />
      <Order />
    </>
  );
};
