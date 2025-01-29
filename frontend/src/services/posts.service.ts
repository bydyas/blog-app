class PostsService {
  #BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;

  async findAll() {
    try {
      const res = await fetch(`${this.#BASE_URL}/`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string) {
    try {
      const res = await fetch(`${this.#BASE_URL}/${id}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    } catch (error) {
      console.error(error);
    }
  }
}

export const postsService = new PostsService();
