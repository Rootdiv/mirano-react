import { Header } from '@/modules/Header/Header';
import { Hero } from '@/modules/Hero/Hero';
import { Goods } from '@/modules/Goods/Goods';
import { Filters } from '@/modules/Filters/Filters';
import { Subscription } from '@/modules/Subscription/Subscription';
import { Footer } from '@/modules/Footer/Footer';
import { Order } from '@/modules/Order/Order';
import { OrderSuccess } from '@/modules/Order/OrderSuccess';

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
    {/* <Order totalPriceValue="0" />
    <OrderSuccess id="971f365a-caa1-4cdb-9446-bad2eff047e1" /> */}
  </>
);
