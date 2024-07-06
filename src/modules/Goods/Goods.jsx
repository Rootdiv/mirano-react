import { Card } from '@/modules/Card/Card';
import { Cart } from '@/modules/Cart/Cart';
import './goods.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGoods } from '@/redux/goodsSlice';

export const Goods = () => {
  const dispatch = useDispatch();
  const { items: goods, status: goodsStatus, error } = useSelector(state => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods({ type: 'bouquets' }));
    }
  }, [dispatch, goodsStatus]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = 'Loading';
  }

  if (goodsStatus === 'success') {
    content = (
      <ul className="goods__list">
        {goods.map(item => (
          <li key={item.id} className="goods__item">
            <Card className="goods__card" {...item} />
          </li>
        ))}
      </ul>
    );
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>
          {content}
        </div>
        <Cart />
      </div>
    </section>
  );
};
