import './Todo.scss';

import { ITodo } from '../../types/Todo';

type PropTypes = {
  todo: ITodo;
};

export const Todo: React.FC<PropTypes> = ({ todo }) => {
  const {
    title, createdAt, finishAt,
  } = todo;

  return (
    <li className="todo">
      <span className="todo__title">{title}</span>
      <div className="todo__date-box">
        <p>{`Created at: ${createdAt}`}</p>
        <p>{`Should be done untill: ${finishAt}`}</p>
      </div>
    </li>
  );
};
