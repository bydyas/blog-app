import { AxiosError } from "axios";
import { instance } from "../libs/axios";
import { SignIn, SignUp } from "../libs/definitions";

class AuthService {
  async auth(type: 'login' | 'reg', data: SignUp | SignIn) {
    try {
      const response = await instance.post(`/auth/${type}`, {
        ...data,
        profile: {
          firstName: data?.firstName,
          lastName: data?.lastName,
        }
      })
      return response.data;
    } catch (error) {
      throw (error as AxiosError)?.response?.data
    }
  }

  async getProfile() {
    try {
      const response = await instance.get(`/auth/profile`)
      return response.data;
    } catch (error) {
      throw (error as AxiosError)?.response?.data
    }
  }
}

export const authService = new AuthService()
