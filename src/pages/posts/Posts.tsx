import React, { Component } from "react";
import { fetchPosts, fetchUsers } from "../../services/api";
import { PostsProps, PostsState } from "../../interface/types";
import PostCard from "../../common/components/PostCard";
import PostsFilters from "./PostsFilters";

export class Posts extends Component<PostsProps, PostsState> {
  constructor(props: PostsProps) {
    super(props);
    this.state = {
      posts: [],
      limit: 10,
      currentPage: 1,
      totalCount: 0,
      users: [],
      userId: 0,
      searchTerm: "",
    };
  }

  componentDidMount(): void {
    this.getUserList();
    this.getPostList(this.state.limit, this.state.currentPage);
  }

  componentDidUpdate(_prevProps: PostsProps, preState: PostsState) {
    if (
      preState.limit != this.state.limit ||
      preState.currentPage != this.state.currentPage ||
      preState.userId != this.state.userId ||
      preState.searchTerm != this.state.searchTerm
    ) {
      this.getPostList(
        this.state.limit,
        this.state.currentPage,
        this.state.userId,
        this.state.searchTerm
      );
    }
  }

  async getPostList(
    limit: number,
    page: number,
    userId: number = 0,
    searchTerm: string = ""
  ) {
    try {
      const { posts, totalCount } = await fetchPosts(
        limit,
        page,
        userId,
        searchTerm
      );

      this.setState((prevState) => {
        return {
          ...prevState,
          posts: [...posts],
          totalCount,
        };
      });
    } catch (error) {
      console.log("Error fetching posts: ", error);
    }
  }

  async getUserList() {
    try {
      const users = await fetchUsers();

      this.setState((prevState) => {
        return {
          ...prevState,
          users: [...users],
        };
      });
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  }

  handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);

    this.setState((prevState) => {
      return {
        ...prevState,
        limit: newLimit,
        currentPage: 1,
      };
    });
  };

  handlePageChange = (page: number) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: page,
      };
    });
  };

  handleUserFilterChange = (userId: number) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        userId,
      };
    });
  };

  handleSearchTermChange = (searchTerm: string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        searchTerm,
      };
    });
  };

  handleClearFilter = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        searchTerm: "",
        userId: 0,
      };
    });
  };

  render() {
    const { posts, limit, currentPage, totalCount, users, searchTerm, userId } =
      this.state;
    const totalPages = Math.ceil(totalCount / limit);

    return (
      <>
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <PostsFilters
            searchTerm={searchTerm}
            users={users}
            onUserFilterChange={(selectedUserId) =>
              this.handleUserFilterChange(selectedUserId)
            }
            onSearchTermChange={(searchTerm) =>
              this.handleSearchTermChange(searchTerm)
            }
            onClearFilter={() => this.handleClearFilter()}
            selectedUser={userId}
          />
          <div className="d-flex gap-2">
            <label style={{ fontSize: "20px" }}>Take count:</label>
            <select
              className="number-select"
              value={limit}
              onChange={this.handleLimitChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <nav aria-label="Page navigation example">
              <ul className="pagination ">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => this.handlePageChange(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      className={`page-link text-success ${
                        currentPage === i + 1 ? "bg-success text-light" : ""
                      }`}
                      href="#"
                      onClick={() => this.handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => this.handlePageChange(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="container">
          <h2 className="text-center p-2 text-success">Posts</h2>
          <div className="row g-3 text-success">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={index}
                  className="col-md-6 col-lg-3 col-sm-6 d-flex justify-content-center"
                >
                  <PostCard post={post} />
                </div>
              ))
            ) : (
              <div className="col-md-12">
                <p>No posts available.</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Posts;
