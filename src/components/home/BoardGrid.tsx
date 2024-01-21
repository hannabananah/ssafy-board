import { useEffect, useState } from "react";
import { Boards } from "@type/.";
import BoardCard from "@home/BoardCard";
import { getBoardList } from "@apis/boardApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@commons/.";

export default function BoardGrid() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Boards>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getBoardList()
      .then((boardList) => {
        setBoards(boardList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error)
    return <div>게시판을 불러오는 중 오류가 발생했습니다. ({error})</div>;

  if (loading) return <div>Loading...</div>;

  if (boards.length === 0) return <div>게시물이 없습니다..</div>;

  const handleClick = () => {
    navigate("/boards/write");
  };

  return (
    <div className="relative py-10 mx-auto">
      <div className="w-full mb-3 text-right">
        <Button type="button" onClick={handleClick} size="w-16" border>
          등록
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-5 sm:grid-cols-2 md:grid-cols-3">
        {boards.map((board, idx) => (
          <BoardCard key={board.id} board={board} idx={++idx} />
        ))}
      </div>
    </div>
  );
}
