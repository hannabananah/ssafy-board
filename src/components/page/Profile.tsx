import ProfileIcon from "@assets/images/profile.svg";
import { SlideBoard } from "@commons/.";
import { useEffect, useState } from "react";
import { Boards } from "@type/.";
import { getBoardList } from "@apis/boardApi";

export default function Profile() {
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
  return (
    <>
      <div className="flex w-full max-w-screen-lg  pb-4 items-center h-[calc(100%-88px)] mt-[88px]">
        <div className="relative w-full h-full  rounded-2xl p-6 shadow-md bg-white">
          {/* 이미지 */}
          <div className="absolute -top-14 left-0 right-0 flex w-28 h-auto m-auto drop-shadow-2xl">
            <img src={ProfileIcon} alt="프로필 디폴트 이미지" />
          </div>
          {/* 회원정보 */}
          <div className="w-60 h-40 m-auto bg-light-gray-color flex justify-center items-center flex-col">
            <p>아이디 : </p>
            <p>닉네임 : </p>
          </div>
          <SlideBoard />
        </div>
      </div>
    </>
  );
}
