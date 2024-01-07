import { Component } from "react";
import { fetchCommentsByPostId } from "../../services/api";
import { IComment, WithRouterProps } from "../../interface/types";
import { useParams } from "react-router-dom";

type PostCommentState = {
  commentsData: IComment[];
};

class PostComments extends Component<WithRouterProps, PostCommentState> {
  constructor(props: WithRouterProps) {
    super(props);

    this.state = {
      commentsData: [],
    };
  }

  componentDidMount() {
    this.getCommentsByPostId();
  }

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

  handleGoBack = () => {
    window.history.back(); 
  };

  render() {
    const { commentsData } = this.state;

    return (
      <div className="container">
        <div className="d-flex p-2">
          <i
            className="fa fa-arrow-left fa-2x text-success"
            onClick={this.handleGoBack}
            role="button"
          ></i>
          <h2 className="text-success mx-auto">Comments</h2>
        </div>
        {commentsData &&
          commentsData.length > 0 &&
          commentsData.map((data, index) => (
            <div key={index} className="card" style={{ marginBottom: "10px" }}>
              <div className="card-header d-flex justify-content-between">
                <h5>{data.name}</h5>
                <div>
                  <span className="text-success">
                    <small className="text-muted">Comment by: </small>
                    {data.email}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">{data.body}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default function () {
  const params = useParams();

  return <PostComments params={params} />;
}
