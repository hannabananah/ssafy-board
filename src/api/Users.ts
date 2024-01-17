const TIME_OUT: number = 300 * 1000;

// StatusError의 타입 정의
interface StatusError {
  status: boolean;
  json: {
    error: string[];
  };
}

const statusError: StatusError = {
  status: false,
  json: {
    error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"],
  },
};

// fetch 함수의 반환 타입 정의
const requestPromise = (
  url: string,
  option: RequestInit
): Promise<Response> => {
  return fetch(url, option);
};

const timeoutPromise = (): Promise<never> => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), TIME_OUT)
  );
};

// getPromise 함수 반환 타입 수정
const getPromise = async (
  url: string,
  option: RequestInit
): Promise<Response | StatusError> => {
  return await Promise.race([requestPromise(url, option), timeoutPromise()]);
};

// loginUser 함수 반환 타입 및 매개변수 타입 정의
export const loginUser = async (
  credentials: Record<string, unknown>
): Promise<StatusError | LoginResponse> => {
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };

  const data = await getPromise("/user/login", option).catch(() => {
    return statusError;
  });

  if (
    data instanceof Response &&
    typeof data.status === "number" &&
    data.status / 100 === 2
  ) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};

interface LoginResponse {
  status: boolean;
  code: number;
  json: unknown;
}

// logoutUser 함수 반환 타입 및 매개변수 타입 정의
export const logoutUser = async (
  credentials: Record<string, unknown>,
  accessToken: string
): Promise<StatusError | LoginResponse> => {
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };

  const data = await getPromise("/logout-url", option).catch(() => {
    return statusError;
  });

  if (
    data instanceof Response &&
    typeof data.status === "number" &&
    data.status / 100 === 2
  ) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};

// requestToken 함수 반환 타입 및 매개변수 타입 정의
export const requestToken = async (
  refreshToken: string
): Promise<StatusError | LoginResponse> => {
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  };

  const data = await getPromise("/user/login", option).catch(() => {
    return statusError;
  });

  if (
    data instanceof Response &&
    typeof data.status === "number" &&
    data.status / 100 === 2
  ) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};
