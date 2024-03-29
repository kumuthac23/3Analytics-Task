import { Component } from "react";
import { fetchCommentsByPostId } from "../../services/api";
import { IComment, WithRouterProps } from "../../interface/types";
import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

// Define the state for the PostComments component
type PostCommentState = {
  commentsData: IComment[];
};

// Class component representing the comments for a specific post
class PostComments extends Component<WithRouterProps, PostCommentState> {
  constructor(props: WithRouterProps) {
    super(props);

    this.state = {
      commentsData: [],
    };
  }

  // Lifecycle method called when the component mounts
  componentDidMount() {
    this.getCommentsByPostId();
  }

  // Asynchronous function to fetch comments for a post by post ID
  async getCommentsByPostId() {
    try {
      const commentsData = await fetchCommentsByPostId(
        this.props.params.postId
      );
      this.setState({ commentsData });
    } catch (error) {
      console.log("Error fetching comments: ", error);
    }
  }

  // Handler function to navigate back to the previous page
  handleGoBack = () => {
    window.history.back();
  };

  // Render method to render the component content
  render() {
    const { commentsData } = this.state;

    return (
      <div className="container">
        <div className="d-flex p-2">
          <div className="d-flex" role="button" onClick={this.handleGoBack}>
            <i className="fa fa-arrow-left fa-2x"></i>
            <h5 className="p-1">GoBack</h5>
          </div>
          <Bounce top delay={500} duration={1000}>
            <h2 className="text-danger mx-auto">Comments</h2>
          </Bounce>
        </div>
        {commentsData &&
          commentsData.length > 0 &&
          commentsData.map((data, index) => (
            <>
              <Fade bottom>
                <div
                  key={index}
                  className="card"
                  style={{ marginBottom: "10px" }}
                >
                  <div className="card-header d-flex justify-content-between">
                    <h5>{data.name}</h5>
                    <div>
                      <span className="text-danger">
                        <small className="text-muted">Comment by: </small>
                        {data.email}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{data.body}</p>
                  </div>
                </div>
              </Fade>
            </>
          ))}
      </div>
    );
  }
}

// Functional component using useParams hook to get route parameters
export default function () {
  const params = useParams();

  return <PostComments params={params} />;
}
