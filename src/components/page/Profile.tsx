import ProfileIcon from "@assets/images/profile.svg";
import { SlideBoard } from "@commons/.";
import { useEffect, useState } from "react";
import { Boards } from "@type/.";
import { getBoardList } from "@apis/boardApi";
import { useUserStore } from "@stores/useUserStore";
import axios from "axios";

export default function Profile() {
  const [boards, setBoards] = useState<Boards>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();

  const logout = () => {
    axios({
      url: "/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

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
        <div className="relative w-full h-full p-6 bg-white shadow-md rounded-2xl">
          {/* 이미지 */}
          <div className="absolute left-0 right-0 flex h-auto m-auto -top-14 w-28 drop-shadow-2xl">
            <img src={ProfileIcon} alt="프로필 디폴트 이미지" />
          </div>
          <button
            onClick={logout}
            className="text-light-gray-color hover:text-dark-gray-color"
          >
            Logout
          </button>
          {/* 회원정보 */}
          <div className="flex flex-col items-center justify-center h-40 m-auto w-60">
            <p>
              아이디 : <b>{user?.userid}</b>
            </p>
            <p>
              닉네임 : <b>{user?.username}</b>
            </p>
          </div>
          <SlideBoard />
        </div>
      </div>
    </>
  );
}
