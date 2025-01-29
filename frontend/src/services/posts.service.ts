import { AxiosError } from "axios";
import { instance } from "../libs/axios";

class PostsService {
  async findAll() {
    try {
      const response = await instance.get('/posts');
      return response.data;
    } catch (error) {
      throw (error as AxiosError)?.response?.data
    }
  }

  async findOne(id: string) {
    try {
      const response = await instance.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw (error as AxiosError)?.response?.data
    }
  }

  async createOne(data: any) {
    try {
      const response = await instance.post(`/posts`, data);
      return response.data;
    } catch (error) {
      throw (error as AxiosError)?.response?.data
    }
  }
}

export const postsService = new PostsService();
