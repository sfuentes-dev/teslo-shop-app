import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';
import Cookies from 'js-cookie';
import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import axios from 'axios';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: JSX.Element;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const checkToken = async () => {
    try {
      const { data } = await tesloApi.get('/user/validate-token');
      const { token, user } = data;
      Cookies.set('token', token, { sameSite: 'strict' });
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token, { sameSite: 'strict' });
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set('token', token, { sameSite: 'strict' });
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: 'We can not create this user, please try again!',
      };
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
