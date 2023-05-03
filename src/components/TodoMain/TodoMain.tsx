import { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { Notification } from '../Notification';
import { TodoFilter } from '../TodoFilter';
import { TodoList } from '../TodoList';

export const TodoMain = () => {
  const [notification, setNotification] = useState('');

  const { todos } = useAppSelector((state) => state.todos);

  useEffect(() => {
    const timeoutId
      = notification && setTimeout(() => setNotification(''), 1500);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  return (
    <main className="main">
      {!!todos.length && <TodoFilter setNotification={setNotification} />}
      <TodoList setNotification={setNotification} />

      {notification && <Notification notification={notification} />}
    </main>
  );
};
