import './footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="container footer__container">
      <img src="/img/logo.svg" alt="Логотип Mirano Flower Boutique" className="footer__logo" />
      <address className="footer__address">
        <a href="mailto:Mirano@gmail.com" className="footer__mail footer__link">
          Mirano@gmail.com
        </a>
        <ul className="footer__social-list">
          <li className="footer__social-item">
            <a href="#" className="footer__social-link" aria-label="Канал в телеграм">
              <svg width="28" height="28">
                <use href="img/sprite.svg#telegram" />
              </svg>
            </a>
          </li>
          <li className="footer__social-item">
            <a href="#" className="footer__social-link" aria-label="Канал в youtube">
              <svg width="28" height="28">
                <use href="img/sprite.svg#youtube" />
              </svg>
            </a>
          </li>
          <li className="footer__social-item">
            <a href="#" className="footer__social-link" aria-label="Группа во ВКонтакте">
              <svg width="28" height="28">
                <use href="img/sprite.svg#vk" />
              </svg>
            </a>
          </li>
        </ul>
      </address>
      <div className="footer__developers">
        <p className="footer__developers-title"></p>
        <ul className="footer__developers-list">
          <li className="footer__developers-item">
            Designer:{' '}
            <a href="https://t.me/Mrshmallowww" className="footer__link">
              Anastasia Ilina
            </a>
          </li>
          <li className="footer__developers-item">
            Developer:{' '}
            <a href="https://t.me/Rootdiv" className="footer__link">
              Vladimir
            </a>
          </li>
        </ul>
      </div>
      <p className="footer__copyright">&copy;Mirano, 2024</p>
    </div>
  </footer>
);
