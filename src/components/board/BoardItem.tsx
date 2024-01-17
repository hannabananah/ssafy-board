import { Board } from "@type/.";
import { Link } from "react-router-dom";

interface Props {
  board: Board;
  idx: number;
}

export default function BoardItem({ board, idx }: Props) {
  const { id, author, createdAt, updatedAt, title } = board;

  return (
    <div className="flex items-center text-center border-b h-14 hover:bg-light-gray-color bg-white-color">
      <div className="w-20 mx-4">{idx}</div>
      <Link className="flex-grow" to={`/boards/${id}`}>
        {title}
      </Link>
      <div className="w-24 mx-4">{author}</div>
      <div className="w-24 mx-3">{createdAt}</div>
      <div className="w-24 mx-3">{updatedAt ? updatedAt : "-"}</div>
    </div>
  );
}
