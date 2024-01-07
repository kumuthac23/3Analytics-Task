import React from "react";
import { IUser } from "../../interface/types";

// Type for the props received by PostsFilters component
type PostFilterPropsType = {
  users: IUser[];
  onUserFilterChange(userId: number): void;
  onSearchTermChange(searchTerm: string): void;
  onClearFilter(): void;
  selectedUser: number;
  searchTerm: string;
};

// Functional component for rendering filters for posts
function PostsFilters(props: PostFilterPropsType) {
  return (
    <div className="d-flex gap-3">
      <select
        className="form-select custom-select"
        aria-label="Default select example"
        onChange={(event) =>
          props.onUserFilterChange(parseInt(event.target.value))
        }
        value={props.selectedUser}
      >
        <option value={0}>Select user</option>
        {/* Mapping over users to populate dropdown options */}
        {props.users &&
          props.users.length > 0 &&
          props.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
      </select>
      <input
        className="form-control"
        style={{ marginLeft: "5px" }}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(event) => props.onSearchTermChange(event.target.value)}
        value={props.searchTerm}
      />
      {/* Button to clear filters */}
      <button
        className="btn btn-outline-danger"
        onClick={() => props.onClearFilter()}
      >
        Clear
      </button>
    </div>
  );
}

export default PostsFilters;
