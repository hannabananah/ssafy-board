import { useEffect, useState } from "react";
import { Boards } from "@type/.";
import { BoardItem, BoardSearch, Filter } from "@board/.";
import { getBoardList } from "@apis/boardApi";

export default function BoardList() {
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
    return (
      <div>게시판 리스트를 불러오는 중 오류가 발생했습니다. ({error})</div>
    );

  if (loading) return <div>Loading...</div>;

  if (boards.length === 0) return <div>게시물이 없습니다..</div>;

  return (
    <>
      <div className="relative mx-auto">
        <h1 className="mb-5 text-2xl font-bold">게시판 리스트</h1>
        <div className="flex items-center justify-between mb-2">
          <p>게시물 수: {boards.length}</p>
          {/* <p>정렬: 최신순</p> */}
          <Filter />
        </div>

        <div className="p-4 font-bold border-b rounded-t-xl text-primary-light-color bg-white-color">
          <div className="flex items-center text-center">
            <div className="w-20 mr-4">번호</div>
            <div className="flex-grow">제목</div>
            <div className="w-24 mx-4">닉네임</div>
            <div className="w-24 mx-3">게시 날짜</div>
            <div className="w-24 mx-3">수정 날짜</div>
          </div>
        </div>

        <div className="mb-5 shadow-md">
          {boards.map((board, idx) => (
            <BoardItem key={board.id} board={board} idx={++idx} />
          ))}
        </div>
        <BoardSearch />
      </div>
    </>
  );
}
