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

  const [userid, onChangeId] = useLoginForm();
  const [password, onChangePw] = useLoginForm();
  const [password2, onChangePw2] = useLoginForm();
  const [username, onChangeName] = useLoginForm();
  const { setIsLogin, setUser } = useUserStore();

  const handleClickSignUp = () => {
    axios({
      url: "/login",
      method: "POST",
      withCredentials: true,
      data: {
        userid: userid,
        password: password,
        username: username,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          const userData = result.data;

          setIsLogin(true);
          setUser(userData);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  // const handleClickSignUp = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   // 회원가입 양식충족
  //   MySwal.fire({
  //     title: "회원가입을 완료하시겠습니까?",
  //     text: "메인페이지로 이동합니다.",
  //     icon: "success",
  //     // iconColor: "#6dcef5",
  //     confirmButtonColor: "#93dffa",
  //     cancelButtonColor: "#efefef",
  //     showConfirmButton: true,
  //     timer: 2000,
  //   }).then(() => {
  //     navigate("/");
  //   });
  // };

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
