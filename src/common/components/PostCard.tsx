import { Component } from "react";
import { PostCardProps } from "../../interface/types";
import { NavigateFunction, useNavigate } from "react-router-dom";

type PostCardPropType = PostCardProps & { navigate: NavigateFunction };

// Class component representing a post card
export class PostCard extends Component<PostCardPropType> {
  constructor(props: PostCardPropType) {
    super(props);
  }

  // Handle the click event on the "View Comments" button
  handleViewCommentsButtonClick = () => {
    const { post, navigate } = this.props;
    const postId = post.id;

    navigate(`/comments/${postId}`);
  };

  render() {
    const { post } = this.props;

    return (
      <div className="card h-100 w-100">
        <div className="card-body">
          <h5 className="card-title h-25">{post.title}</h5>
          <hr />
          <p className="card-text" style={{ marginBottom: "50px" }}>
            {post.body}
          </p>
          <div>
            <button
              type="button"
              className="btn btn-outline-danger position-absolute btn-sm"
              style={{ bottom: "10px", right: "10px" }}
              onClick={this.handleViewCommentsButtonClick}
            >
              View Comments
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Functional component that wraps the PostCard component with the useNavigate hook
export default function (props: PostCardProps) {
  const navigate = useNavigate();

  return <PostCard {...props} navigate={navigate} />;
}
