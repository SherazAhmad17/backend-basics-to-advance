import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthApi } from "../Api/AuthApi";
import { api } from "../Api/AxiosIntense";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const isAuthenticated = accessToken ? true : false;

  useEffect(() => {
    async function session() {
      try {
        const res = await AuthApi.refreshToken();
        setAccessToken(res.data.data.accessToken);
        setUser(res.data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
      }
    }
    session();
  }, []);

  //? here are the interceptors of axios
  //* this is request interceptor

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken && !config._retry) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(config);
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    return () => {
      return api.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  //? here we are going to create response interceptor
  //* response interceptor

  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const failedRequest = err.config; //req obj
        if (
          err.response.status === 401 &&
          err.response.status === 403 &&
          !failedRequest._retry
        ) {
          failedRequest._retry = true;
          try {
            const res = await AuthApi.refreshToken();
            failedRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

            setUser(res.data.user);
            setAccessToken(res.data.accessToken);

            return failedRequest;
          } catch {
            setUser(null);
            setAccessToken(null);
          }
        }

        return Promise.reject(err);
      },
    );

    return () => {
      return api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      values={{ user, setUser, setAccessToken, accessToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
