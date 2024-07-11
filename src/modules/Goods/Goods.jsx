import { Card } from '@/modules/Card/Card';
import { Cart } from '@/modules/Cart/Cart';
import './goods.scss';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

export const Goods = () => {
  const { items: goods, status: goodsStatus, error } = useSelector(state => state.goods);
  const goodsTitle = useSelector(state => state.filters.typeName);

  const goodsRef = useRef(null);

  useEffect(() => {
    if (goodsTitle === 'Результат поиска') {
      goodsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [goodsTitle]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = 'Loading';
  }

  if (goodsStatus === 'success') {
    content = (
      <ul className="goods__list">
        {goods.length ? (
          goods.map(item => (
            <li key={item.id} className="goods__item">
              <Card className="goods__card" {...item} />
            </li>
          ))
        ) : (
          <li className="goods__no-product">Товары не найдены</li>
        )}
      </ul>
    );
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section className="goods" ref={goodsRef}>
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">{goodsTitle}</h2>
          {content}
        </div>
        <Cart />
      </div>
    </section>
  );
};
