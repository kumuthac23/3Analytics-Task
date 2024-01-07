import { Component } from "react";
import { fetchCommentsByPostId } from "../../services/api";
import { IComment, WithRouterProps } from "../../interface/types";
import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

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
            className="fa fa-arrow-left fa-2x text-danger"
            onClick={this.handleGoBack}
            role="button"
          ></i>
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

export default function () {
  const params = useParams();

  return <PostComments params={params} />;
}
