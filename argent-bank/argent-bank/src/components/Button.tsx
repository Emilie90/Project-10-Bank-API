const Button = ({
  content,
  classe,
  click,
}: {
  content: string;
  classe: string;
  click: any;
}) => {
  return (
    <div>
      <button type="submit" className={classe} onClick={click}>
        {content}
      </button>
    </div>
  );
};

export default Button;
