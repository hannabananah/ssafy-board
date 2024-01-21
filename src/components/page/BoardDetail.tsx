import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardById, removeBoardById } from "@apis/boardApi";
import { Board } from "@type/.";
import { useUserStore } from "@stores/useUserStore";
import { Button } from "@commons/.";

export default function BoardDetail() {
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    getBoardById(id)
      .then((board) => {
        setBoard(board);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleRemove = () => {
    if (!id) return;
    removeBoardById(id)
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          navigate("/main");
        }
      })
      .catch(alert);
  };

  const handleEdit = () => {
    if (!id) return;
    navigate(`/boards/${id}/edit`, { state: { board } });
  };

  if (error)
    return <div>게시물을 불러오는 중 오류가 발생했습니다. ({error})</div>;

  if (loading) return <div>Loading...</div>;

  if (!board) return <div>게시물이 없습니다.</div>;

  const { createdAt, author, updatedAt, content, title } = board;
  return (
    <>
      <div className="flex flex-col items-center h-full p-10 mx-auto">
        <h2 className="mb-5 text-2xl font-bold">게시물 상세</h2>
        <div className="flex bg-white-color rounded-xl flex-col w-10/12 h-[600px] p-10 shadow-md">
          <h1 className="text-4xl font-bold">{title}</h1>
          <div className="flex justify-between mt-4">
            <div className="mb-5 text-dark-gray-color">by {author}</div>
            <div className="text-dark-gray-color ">{createdAt}</div>
          </div>
          <div className="flex-grow text-lg">{content}</div>
          {updatedAt ? (
            <div className="text-dark-gray-color">수정 됨 - {updatedAt}</div>
          ) : (
            ""
          )}
          <div className="flex gap-4">
            <Button type="button" size="w-1/2" onClick={handleEdit} border>
              수정
            </Button>
            <Button type="button" size="w-1/2" onClick={handleRemove} filled>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
