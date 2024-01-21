import { useEffect, useState } from "react";
import { createBoard, updateBoard } from "@apis/boardApi";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@commons/.";
import { useUserStore } from "@stores/useUserStore";

interface Props {
  editMode?: boolean;
}

// Fixme : 수정 & 생성 로직 리펙토링 필요
export default function BoardWrite({ editMode }: Props) {
  const { user } = useUserStore();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    username: user?.username,
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Fixme : 로직 수정 필요
  useEffect(() => {
    // Edit Mode 일 때
    if (editMode) {
      const board = location.state.board;
      setFormData({
        title: board.title,
        content: board.content,
        username: user?.username,
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createBoard(formData)
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          navigate("/main");
        }
      })
      .catch(alert);
    return;
  };

  const handleCreate = (e: React.FormEvent<HTMLButtonElement>) => {
    handleSubmit(e);
  };

  // Fixme : 로직 수정 필요
  const handleEdit = () => {
    const board = location.state.board;
    updateBoard(board.id, formData)
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          navigate(`/boards/${board.id}`);
        }
      })
      .catch(alert);
  };

  return (
    <>
      <div className="flex flex-col items-center h-full p-10 mx-auto">
        <h1 className="mb-5 text-2xl font-bold">
          {editMode ? "게시판 수정" : "게시판 생성"}
        </h1>
        <div className="flex bg-white-color justify-center rounded-xl flex-col w-10/12 h-[600px] p-10 shadow-md">
          <form className="flex flex-col gap-4">
            <div className="flex gap-4">
              <label className="text-lg font-bold" htmlFor="title">
                제목
              </label>
              <input
                className="flex-grow bg-transparent border-b focus:outline-none border-b-primary-light-color"
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                value={formData.title}
              />
            </div>
            <div className="flex gap-4">
              <label className="text-lg font-bold" htmlFor="username">
                이름
              </label>
              <input
                className="flex-grow bg-transparent border-b focus:outline-none border-b-primary-light-color"
                onChange={handleChange}
                type="text"
                id="username"
                name="username"
                readOnly
                value={formData.username}
              />
            </div>
            <div className="flex gap-4">
              <label className="text-lg font-bold" htmlFor="content">
                내용
              </label>
              <textarea
                className="flex-grow px-5 py-2 bg-transparent border resize-none h-80 focus:outline-none border-primary-light-color rounded-xl"
                onChange={handleChange}
                id="content"
                name="content"
                value={formData.content}
              />
            </div>
          </form>
          <div className="flex justify-center mt-5">
            {editMode ? (
              <Button type="submit" size="w-1/2" onClick={handleEdit} filled>
                수정
              </Button>
            ) : (
              <Button type="submit" size="w-1/2" onClick={handleCreate} filled>
                생성
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
