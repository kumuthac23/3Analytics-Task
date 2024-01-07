import { IComment as IComment, IPosts, IUser } from "../interface/types";
import { httpWithoutCredentials } from "./http";

const fetchPosts = async (
  limit: number,
  page: number,
  userId: number = 0,
  searchTerm: string = ""
) => {
  try {
    const response = await httpWithoutCredentials.get<IPosts[]>(
      `/posts?_limit=${limit}&_page=${page}` +
        (userId > 0 ? `&userId=${userId}` : "") +
        (searchTerm ? `&q=${searchTerm}` : "")
    );
    // To find the total count of data
    const totalCount = parseInt(response.headers["x-total-count"], 10);
    return { posts: response.data, totalCount };
  } catch (error) {
    throw error;
  }
};

const fetchCommentsByPostId = async (postId: string | undefined) => {
  try {
    const response = await httpWithoutCredentials.get<IComment[]>(
      `/comments?postId=${postId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const response = await httpWithoutCredentials.get<IUser[]>("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchPosts, fetchCommentsByPostId, fetchUsers };
