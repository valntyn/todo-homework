import { memo, useEffect, useRef } from 'react';
import './Notification.scss';

type PropTypes = {
  notification: string;
};

export const Notification: React.FC<PropTypes> = memo(({ notification }) => {
  const notifyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const notifyElement = notifyRef.current;

    if (notifyElement && notification) {
      const timeoutId = setTimeout(() => {
        notifyElement.classList.add('notification--active');
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        notifyElement.classList.remove('notification--active');
      };
    }

    return () => {};
  }, [notification]);

  return (
    <div ref={notifyRef} className="notification">
      <div className="notification__box">
        <p className="notification__text">{notification}</p>
      </div>
    </div>
  );
});
