import { IComment as IComment, IPosts, IUser } from "../interface/types";
import { httpWithoutCredentials } from "./http";

/**
 * Fetches a list of posts with optional filters.
 * @param limit - The number of posts to retrieve per page.
 * @param page - The page number of the posts.
 * @param userId - Optional user ID filter for posts.
 * @param searchTerm - Optional search term for posts.
 * @returns An object containing the list of posts and the total count of posts.
 * @throws Throws an error if the API request fails.
 */

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

/**
 * Fetches comments for a specific post based on its ID.
 * @param postId - The ID of the post for which to retrieve comments.
 * @returns An array of comments associated with the specified post.
 * @throws Throws an error if the API request fails.
 */
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

/**
 * Fetches a list of users.
 * @returns An array of user objects.
 * @throws Throws an error if the API request fails.
 */
const fetchUsers = async () => {
  try {
    const response = await httpWithoutCredentials.get<IUser[]>("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchPosts, fetchCommentsByPostId, fetchUsers };
