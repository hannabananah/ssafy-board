import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { loginUser } from "@apis/Users";
import { setRefreshToken } from "@storage/Cookie";
import { SET_TOKEN } from "@stores/Auth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface ResponseData {
  refresh_token: string;
  access_token: string;
}

interface FormData {
  userid: string;
  password: string;
}

export default function LogSignupin() {
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

  const handleClickSignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // 회원가입 양식충족
    MySwal.fire({
      title: "회원가입을 완료하시겠습니까?",
      text: "메인페이지로 이동합니다.",
      icon: "success",
      // iconColor: "#6dcef5",
      confirmButtonColor: "#93dffa",
      cancelButtonColor: "#efefef",
      showConfirmButton: true,
      timer: 2000,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-[360px] p-8 m-auto bg-opacity-40 hover:bg-opacity-50 h-[420px] bg-white-color rounded-xl backdrop-filter backdrop-blur-lg">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-10">
            <span className="text-4xl font-extrabold text-center text-black-color">
              SignUp
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
              <div className="h-10">
                <input
                  type="password"
                  placeholder="비밀번호 확인"
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
              {/* 비밀번호가 일치하지 않습니다. */}
              <ErrorMessage
                name="password"
                errors={errors}
                render={({ message }) => (
                  <p className="text-sm font-medium text-rose-500">{message}</p>
                )}
              />
            </div>
          </div>

          {/* {errors.userid && <div className="mt-2 text-red-500">꾸엥</div>}
          {errors.password && <div className="mt-2 text-red-500">꾸엥</div>}

          {error && <div className="mt-2 text-red-500">{error}</div>} */}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full p-2 rounded cursor-pointer bg-white-color text-black-color hover:bg-light-gray-color"
              onClick={handleClickSignUp}
            >
              회원가입 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
