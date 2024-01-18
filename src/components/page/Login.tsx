import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { loginUser } from "@apis/Users";
import { setRefreshToken } from "@storage/Cookie";
import { SET_TOKEN } from "@stores/Auth";

interface ResponseData {
  refresh_token: string;
  access_token: string;
}

interface FormData {
  userid: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onValid: SubmitHandler<FormData> = async ({ userid, password }) => {
    const response = await loginUser({ userid, password });

    if (response.status) {
      const responseData = response.json as ResponseData;

      setRefreshToken(responseData.refresh_token);
      dispatch(SET_TOKEN(responseData.access_token));

      return navigate("/");
    } else {
      console.log(response.json);
    }
    setValue("password", "");
  };
  const [error, setError] = useState("");

  // const handleClickSignIn = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   console.log("로그인 버튼 클릭");
  // };

  const handleClickSignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-[360px] p-8 m-auto bg-opacity-40  h-[420px] bg-white-color rounded-xl backdrop-filter backdrop-blur-lg">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-10">
            <span className="text-4xl font-extrabold text-center text-black-color">
              Login
            </span>
            <div className="flex flex-col gap-6">
              <div className="h-10">
                <input
                  type="text"
                  placeholder="아이디"
                  {...register("userid", { required: "아이디를 입력하세요" })}
                  className="w-full p-2 border rounded border-light-gray-color"
                />
                <ErrorMessage
                  name="userid"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm font-medium text-rose-500">
                      {message}
                    </p>
                  )}
                />
              </div>
              <div className="h-10">
                <input
                  type="password"
                  placeholder="비밀번호"
                  {...register("password", {
                    required: "비밀번호를 입력하세요",
                  })}
                  className="w-full p-2 border rounded border-light-gray-color"
                />
                <ErrorMessage
                  name="password"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm font-medium text-rose-500">
                      {message}
                    </p>
                  )}
                />
              </div>
            </div>
          </div>

          {/* {errors.userid && <div className="mt-2 text-red-500">꾸엥</div>}
          {errors.password && <div className="mt-2 text-red-500">꾸엥</div>}

          {error && <div className="mt-2 text-red-500">{error}</div>} */}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full p-2 rounded cursor-pointer bg-primary-light-color text-white-color hover:bg-primary-color"
              // onClick={handleClickSignIn}
            >
              로그인
            </button>
            <button
              onClick={handleClickSignUp}
              className="w-full p-2 rounded cursor-pointer bg-white-color text-black-color hover:bg-light-gray-color"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
