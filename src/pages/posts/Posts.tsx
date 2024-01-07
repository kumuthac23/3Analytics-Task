import React, { Component } from "react";
import { fetchPosts, fetchUsers } from "../../services/api";
import { PostsProps, PostsState } from "../../interface/types";
import PostCard from "../../common/components/PostCard";
import PostsFilters from "./PostsFilters";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

// Class component for rendering a list of posts with filters
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

  // Lifecycle method called when the component mounts
  componentDidMount(): void {
    this.getUserList();
    this.getPostList(this.state.limit, this.state.currentPage);
  }

  // Lifecycle method called when the component updates
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

  // Asynchronous function to fetch posts based on filters
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

  // Asynchronous function to fetch the list of users
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

  // Handler function for changing the limit of posts displayed per page
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

  // Handler function for changing the current page of posts
  handlePageChange = (page: number) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: page,
      };
    });
  };

  // Handler function for changing the user filter
  handleUserFilterChange = (userId: number) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        userId,
      };
    });
  };

  // Handler function for changing the search term filter
  handleSearchTermChange = (searchTerm: string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: 1,
        searchTerm,
      };
    });
  };

  // Handler function for clearing all filters
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

  // Render method to render the component content
  render() {
    const { posts, limit, currentPage, totalCount, users, searchTerm, userId } =
      this.state;
    const totalPages = Math.ceil(totalCount / limit);

    return (
      <>
        {/* Filter and pagination controls */}
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
          {/* Display options for the number of posts to be shown per page */}
          <div className="d-flex gap-2"></div>
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
                      className={`page-link text-danger ${
                        currentPage === i + 1 ? "bg-danger text-light" : ""
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
          <Bounce top duration={1000}>
            <h2 className="text-center p-2 text-danger">Posts</h2>
          </Bounce>
          <div className="row g-3 text-danger">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={index}
                  className="col-md-6 col-lg-3 col-sm-6 d-flex justify-content-center"
                >
                  <Fade bottom duration={1000}>
                    <PostCard post={post} />
                  </Fade>
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
