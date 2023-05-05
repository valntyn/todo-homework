import classNames from 'classnames';
import React, {
  memo, useCallback, useEffect, useRef,
} from 'react';

import './Modal.scss';
import { useTheme } from '../../context/ThemeContext';

type PropTypes = {
  isModalActive: boolean;
  setIsModalActive: (active: boolean) => void;
  children: React.ReactNode;
};

export const Modal: React.FC<PropTypes> = memo(
  ({ children, setIsModalActive, isModalActive }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
      const modalElement = modalRef.current;

      if (isModalActive && modalElement) {
        const timeoutId = setTimeout(() => {
          modalElement.classList.add('modal--active');
        }, 10);

        return () => clearTimeout(timeoutId);
      }

      return () => {};
    }, [setIsModalActive]);

    const handleClick = useCallback(() => {
      setIsModalActive(false);
    }, [setIsModalActive]);

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClick();
        }
      };

      document.addEventListener('keydown', handleKeyPress);

      return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleClick]);

    const isDark = theme === 'dark';

    return (
      <div className="modal" ref={modalRef} onClick={handleClick}>
        <div
          className={classNames('modal__content', {
            'modal__content--dark': isDark,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  },
);
