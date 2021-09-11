interface Props {
  onClick: any;
  description: string;
  css?: string;
}

function Button({ onClick, description, css }: Props) {
  return (
    <div
      className={`inline-flex justify-center  transition  rounded-md shadow-md cursor-pointer  focus:outline-none focus:ring-5 hover:-translate-y-0.5 ${css}`}
      onClick={onClick}
    >
      <p className="tracking-wide text-white font-regular text-md">
        {description}
      </p>
    </div>
  );
}

export default Button;
