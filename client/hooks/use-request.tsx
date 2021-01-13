import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { User } from '../src/models/user';

interface UseRequestProps {
  url: string;
  method: string;
  body: any;
  onSuccess: Function;
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<{ message: string; field: string }[]>(
    null
  );

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response: AxiosResponse<User> = await axios[method](url, {
        ...body,
        ...props,
      });
      onSuccess(response.data);
      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors } as const;
};

export default useRequest;
