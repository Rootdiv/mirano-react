import { useEffect, useRef } from 'react';
import './choices.scss';
import clsx from 'clsx';
import { debounce, adjustElementPosition } from '@/utils';

export const Choices = ({ buttonLabel, children, className, isOpen, onToggle }) => {
  const choicesRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      adjustElementPosition(choicesRef.current);
    }

    const debouncedAdjustElementPosition = debounce(() => {
      if (isOpen) {
        adjustElementPosition(choicesRef.current);
      }
    }, 100);

    window.addEventListener('resize', debouncedAdjustElementPosition);

    return () => {
      window.removeEventListener('resize', debouncedAdjustElementPosition);
    };
  }, [isOpen]);

  return (
    <div className={clsx('choices', className)}>
      <button
        type="button"
        className={clsx('choices__btn', isOpen && 'choices__btn_active')}
        onClick={onToggle}>
        {buttonLabel}
      </button>
      {isOpen && (
        <div className={clsx('choices__box', isOpen && 'choices__box_open')} ref={choicesRef}>
          {children}
        </div>
      )}
    </div>
  );
};
