import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";

export const axiosInstanceWithOutCredential = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosLoader = (_axiosInstance: AxiosInstance) => {
  const [counter, setCounter] = useState(0);

  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  ); // add to counter
  const dec = useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter]
  ); // remove from counter

  // create the interceptors
  const interceptors = useMemo(
    () => ({
      request: (config: InternalAxiosRequestConfig) => {
        inc();
        return config;
      },
      response: (response: AxiosResponse) => {
        dec();
        return response;
      },
      error: (error: AxiosError) => {
        dec();
        return Promise.reject(error);
      },
    }),
    [inc, dec]
  );

  useEffect(() => {
    // add request interceptors
    _axiosInstance.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    // add response interceptors
    _axiosInstance.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );
    return () => {
      // remove all intercepts when done
      _axiosInstance.interceptors.request.eject(interceptors.request as any);
      _axiosInstance.interceptors.response.eject(interceptors.response as any);
      _axiosInstance.interceptors.response.eject(interceptors.error as any);
    };
  }, [interceptors]);

  return [counter > 0];
};

export default useAxiosLoader;

const httpWithoutCredentials = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceWithOutCredential.get<T>(url, config),
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceWithOutCredential.post<T>(url, data, config),
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceWithOutCredential.delete<T>(url, config),
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> =>
    axiosInstanceWithOutCredential.put<T>(url, data, config),
};

export { httpWithoutCredentials };
