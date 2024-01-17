import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookieToken, removeCookieToken } from "@storage/Cookie";
import { requestToken } from "@apis/Users";
import { DELETE_TOKEN, SET_TOKEN } from "@stores/Auth";

interface RootState {
  token: {
    authenticated: boolean;
    expireTime: number;
  };
}

// interface CheckTokenProps {
//   key: string;
// }

interface ResponseData {
  access_token: string;
}

export function CheckToken(key: any) {
  const [isAuth, setIsAuth] = useState<string>("Loaded");
  const { authenticated, expireTime } = useSelector(
    (state: RootState) => state.token
  );
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      if (refreshToken === undefined) {
        dispatch(DELETE_TOKEN());
        setIsAuth("Failed");
      } else {
        if (authenticated && new Date().getTime() < expireTime) {
          setIsAuth("Success");
        } else {
          const response = await requestToken(refreshToken);

          if (response.status) {
            const responseData = response.json as ResponseData;
            const token = responseData.access_token;
            dispatch(SET_TOKEN(token));
            setIsAuth("Success");
          } else {
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            setIsAuth("Failed");
          }
        }
      }
    };
    checkAuthToken();
  }, [refreshToken, dispatch, key]);

  return {
    isAuth,
  };
}
