import './Todo.scss';

type PropTypes = {
  title: string;
  createdAt: string | Date;
  finishAt: string | Date;
};

export const Todo: React.FC<PropTypes> = ({ title, createdAt, finishAt }) => {
  return (
    <li className="todo">
      <div className="todo__status" />
      <span className="todo__title">{title}</span>
      <div className="todo__date-box">
        <p>{`Created at: ${createdAt}`}</p>
        <p>{`Should be done untill: ${finishAt}`}</p>
      </div>
    </li>
  );
};
