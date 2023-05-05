import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useTheme } from '../../context/ThemeContext';
import { selectActiveCount } from '../../store/selectors/selectTodosCount';
import './TodoFooter.scss';

export const TodoFooter = () => {
  const activeTodosCount = useSelector(selectActiveCount);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={classNames('footer', {
      'footer--dark': isDark,
    })}
    >
      <p className={classNames('footer__todo-count', {
        'footer__todo-count--dark': isDark,
      })}
      >
        {`In progress: ${activeTodosCount} todos`}
      </p>
    </footer>
  );
};
