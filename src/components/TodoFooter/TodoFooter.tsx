import { useSelector } from 'react-redux';

import { selectActiveCount } from '../../store/selectors/selectTodosCount';
import './TodoFooter.scss';

export const TodoFooter = () => {
  const activeQuantity = useSelector(selectActiveCount);

  return (
    <div className="footer">
      <p className="footer__todo-count">
        {`In progress: ${activeQuantity} todos`}
      </p>
    </div>
  );
};
