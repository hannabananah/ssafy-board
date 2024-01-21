import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

import { useLoginForm } from "@hooks/.";
import { useUserStore } from "@stores/useUserStore";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Signup() {
  const navigate = useNavigate();

  const [userid, setUserId, onChangeId] = useLoginForm();
  const [password, setPw, onChangePw] = useLoginForm();
  const [password2, setPw2, onChangePw2] = useLoginForm();
  const [username, setUsername, onChangeName] = useLoginForm();
  const { setIsLogin, setUser } = useUserStore();

  const handleClickSignUp = () => {
    if (password !== password2) {
      MySwal.fire({
        title: "비밀번호가 일치하지 않습니다.",
        text: "다시 시도해주세요.",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
      setPw("");
      setPw2("");
      return;
    }

    axios({
      url: "/signup",
      method: "POST",
      withCredentials: true,
      data: {
        userid: userid,
        password: password,
        username: username,
      },
    })
      .then((result) => {
        if (result.status === 201) {
          const userData = result.data;
          setIsLogin(true);
          setUser(userData);

          MySwal.fire({
            title: "회원가입을 완료하였습니다!",
            text: "메인페이지로 이동합니다.",
            icon: "success",
            confirmButtonColor: "#93dffa",
            cancelButtonColor: "#efefef",
            showConfirmButton: true,
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);

        if (error.response && error.response.status === 400) {
          MySwal.fire({
            title: "이미 존재하는 아이디입니다.",
            text: "다른 아이디를 입력해주세요.",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          });
          setUserId("");
          setPw("");
          setPw2("");
          setUsername("");
        }
      });
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-[360px] p-8 m-auto bg-opacity-40 hover:bg-opacity-50 h-[380px] bg-white-color rounded-xl backdrop-filter backdrop-blur-lg">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-10">
            <span className="text-4xl font-extrabold text-center text-black-color">
              SignUp
            </span>
            <div className="flex flex-col w-full gap-2">
              <input
                type="userid"
                placeholder="아이디"
                className="w-full h-10 p-2 border rounded border-light-gray-color"
                onChange={onChangeId}
                value={userid}
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full h-10 p-2 border rounded border-light-gray-color"
                onChange={onChangePw}
                value={password}
              />
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="w-full h-10 p-2 border rounded border-light-gray-color"
                onChange={onChangePw2}
                value={password2}
              />
              <input
                type="text"
                placeholder="닉네임"
                className="w-full h-10 p-2 border rounded border-light-gray-color"
                onChange={onChangeName}
                value={username}
              />
            </div>
          </div>
          <button
            onClick={handleClickSignUp}
            className="w-full p-2 rounded cursor-pointer bg-white-color text-black-color hover:bg-light-gray-color"
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
}
