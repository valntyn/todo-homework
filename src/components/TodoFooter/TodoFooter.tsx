import { useSelector } from 'react-redux';

import { selectActiveCount } from '../../store/selectors/selectTodosCount';
import './TodoFooter.scss';

export const TodoFooter = () => {
  const activeTodosCount = useSelector(selectActiveCount);

  return (
    <footer className="footer">
      <p className="footer__todo-count">
        {`In progress: ${activeTodosCount} todos`}
      </p>
    </footer>
  );
};
