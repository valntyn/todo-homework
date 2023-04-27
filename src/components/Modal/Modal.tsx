import classNames from 'classnames';
import React, { memo } from 'react';

import './Modal.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/modal/itActive';

type PropTypes = {
  children: React.ReactNode;
};

export const Modal: React.FC<PropTypes> = memo(({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector(state => state.isActive);

  const handleClick = () => {
    dispatch(actions.setIsActive(false));
  };

  return (
    <button
      type="button"
      className={classNames(
        'modal',
        {
          'modal--active': isActive,
        },
      )}
      onClick={handleClick}
    >
      <button
        type="button"
        className="modal__content"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </button>
    </button>
  );
});
