import axios, { AxiosResponse } from "axios";

class API {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getTodos<T>(): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}/todos`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todos from todos:`, error);
      throw error;
    }
  }

  public async createTodo<T>( data: any): Promise<T> {
    try {
      data = { ...data, completed: false };
      const response: AxiosResponse<T> = await axios.post(`${this.baseUrl}/todos`, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating todo at todos:`, error);
      throw error;
    }
  }

  public async updateTodo<T>( data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(`${this.baseUrl}/update?`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo at update:`, error);
      throw error;
    }
  }

  public async deleteTodo<T>( data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(`${this.baseUrl}/remove`, {data: data});
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo at remove:`, error);
      throw error;
    }
  }
}

const baseUrl = new API("http://localhost:3000");

const API_ENDPOINTS = {
  getTodos: () => baseUrl.getTodos(),
  createTodo: (data: any) => baseUrl.createTodo(data),
  updateTodo: (data: any) => baseUrl.updateTodo(data),
  deleteTodo: (data: any) => baseUrl.deleteTodo(data),
};

export default API_ENDPOINTS;
