import './Wrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<PropTypes> = ({ children }) => {
  return (
    <div className="wrapper">
      <h1 className="wrapper__title">Reenbit</h1>
      <div className="wrapper__content">
        {children}
      </div>
    </div>
  );
};
