import { Header } from '@/modules/Header/Header';
import { Hero } from '@/modules/Hero/Hero';
import { Goods } from '@/modules/Goods/Goods';
import { Filters } from '@/modules/Filters/Filters';
import { Subscription } from '@/modules/Subscription/Subscription';
import { Footer } from '@/modules/Footer/Footer';
import { Order } from '@/modules/Order/Order';

export const App = () => (
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
