import { memo } from 'react';
import './Notification.scss';

type PropTypes = {
  notification: string;
};

export const Notification: React.FC<PropTypes> = memo(({ notification }) => {
  return (
    <div className="notification">
      <div className="notification__box">
        <p className="notification__text">{notification}</p>
      </div>
    </div>
  );
});
