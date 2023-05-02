import { useMemo } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as todoActions } from '../../store/actions/todosActions';
import { FilterBlock } from '../FilterBlock';

import './TodoFooter.scss';

export const TodoFooter = () => {
  const { todos } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const activeCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  const handleDeleteCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        dispatch(todoActions.deleteTodo(todo.id));
      }
    });
  };

  return (
    <footer className="footer">
      <span className="footer__todo-count">
        {`In progress: ${activeCount} todos`}
      </span>

      <FilterBlock />

      <button
        onClick={handleDeleteCompleted}
        type="button"
        className="footer__completed"
        disabled={!completedCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
