interface Props {
  type: "button" | "submit";
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: string;
  border?: boolean;
  filled?: boolean;
}

export default function Button({
  type,
  children,
  onClick,
  size = "w-full",
  border = false,
  filled = false,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${size} p-2 rounded-lg text-sm ${
        border &&
        "bg-white-color border border-primary-color text-primary-color"
      } ${filled && "bg-primary-color text-white-color"}`}
    >
      {children}
    </button>
  );
}
