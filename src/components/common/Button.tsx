interface Props {
  type: "button" | "submit";
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  size?: string;
}
export default function Button({
  type,
  children,
  onClick,
  disabled = false,
  size = "w-full",
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${size} p-2 rounded-lg text-sm border-none text-white-color ${
        disabled
          ? "bg-dark-gray-color cursor-not-allowed"
          : "bg-black-color cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
