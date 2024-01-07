import { Params } from "react-router-dom";

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: IPosts[];
  limit: number;
  currentPage: number;
  totalCount: number;
  users: IUser[];
  userId: number;
  searchTerm: string;
}

export interface PostsProps {}

export interface PostCardProps {
  post: IPosts;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface WithRouterProps {
  params: Params<string>;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
}

export interface ISnackBarContextType {
  snackBarState: ISnackbarState;
  updateSnackBarState: (
    isOpen: boolean,
    message: any,
    severity: string
  ) => void;
}

export interface ISnackbarState {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: string;
}

export interface IContactFormResolver {
  username: string;
  password: string;
}

export const ContactFormInitialValue: IContactFormResolver = {
  username: "",
  password: "",
};
