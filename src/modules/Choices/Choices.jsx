import './choices.scss';
import clsx from 'clsx';

export const Choices = ({ buttonLabel, children, className, isOpen, onToggle }) => (
  <div className={clsx('choices', className)}>
    <button type="button" className={clsx('choices__btn', isOpen && 'choices__btn_active')} onClick={onToggle}>
      {buttonLabel}
    </button>
    {isOpen && <div className={clsx('choices__box', isOpen && 'choices__box_open')}>{children}</div>}
  </div>
);
