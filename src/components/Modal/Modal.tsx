import React, {
  memo, useCallback, useEffect, useRef,
} from 'react';

import './Modal.scss';

type PropTypes = {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  children: React.ReactNode;
};

export const Modal: React.FC<PropTypes> = memo(({
  children,
  setIsActive,
  isActive,
}) => {
  const modalRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (isActive && modalElement) {
      const timeoutId = setTimeout(() => {
        modalElement.classList.add('modal--active');
      }, 10);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [isActive]);

  const handleClick = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClick();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleClick]);

  return (
    <button
      type="button"
      className="modal"
      ref={modalRef}
      onClick={handleClick}
    >
      <button
        type="button"
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </button>
    </button>
  );
});
