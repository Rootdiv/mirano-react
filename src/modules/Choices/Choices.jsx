import './choices.scss';
import clsx from 'clsx';
import { useState } from 'react';

export const Choices = ({ buttonLabel, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(oldIsOpen => !oldIsOpen);
  };

  return (
    <div className={clsx('choices', className)}>
      <button type="button" className={clsx('choices__btn', isOpen && 'choices__btn_active')} onClick={handleToggle}>
        {buttonLabel}
      </button>
      {isOpen && <div className={clsx('choices__box', isOpen && 'choices__box_open')}>{children}</div>}
    </div>
  );
};
