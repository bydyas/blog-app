import { AxiosError } from "axios";
import { instance } from "../libs/axios";

class CommentsService {
  async createOne(data: any) {
    try {
      const response = await instance.post(`/comments`, data);
      return response.data;
    } catch (error) {
      throw (error as AxiosError)?.response?.data
    }
  }
}

export const commentsService = new CommentsService();
