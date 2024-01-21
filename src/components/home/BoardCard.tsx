import { Board } from "@type/.";
import { Link } from "react-router-dom";
import { useUserStore } from "@stores/useUserStore";

interface Props {
  board: Board;
  idx: number;
}

export default function BoardCard({ board }: Props) {
  const { id, author, thumbnail, createdAt, content, title } = board;

  return (
    <div className="flex flex-col justify-between p-4 border shadow-md bg-white-color rounded-2xl">
      <div>
        <Link to={`/boards/${id}`}>
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="object-cover w-full h-40 mb-4 rounded-md"
          />
        </Link>
        <div className="flex items-center mb-2">
          <span className="text-sm text-dark-gray-color">{author}</span>
          <span className="ml-auto text-sm text-dark-gray-color">
            {createdAt}
          </span>
        </div>
        <Link to={`/boards/${id}`} className="flex-grow">
          <h2 className="mb-2 text-xl font-bold">{title}</h2>
        </Link>
        <p className="text-dark-gray-color">
          {content.length > 100 ? `${content.slice(0, 100)}...` : content}
        </p>
      </div>

      <Link
        to={`/boards/${id}`}
        className="p-2 mt-4 text-center rounded-md text-white-color bg-primary-color"
      >
        Read More
      </Link>
    </div>
  );
}
