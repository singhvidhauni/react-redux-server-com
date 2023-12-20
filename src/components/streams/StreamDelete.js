import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "./../Modal";
import withRouter from "../../withRouter";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.params.id);
  }
  renderActions() {
    return (
      <React.Fragment>
        <div
          onClick={() => this.deleteStream(this.props.params.id)}
          className="ui button negative"
        >
          Delete
        </div>
        <Link to={`/`} className="ui cancel button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  deleteStream(id) {
    this.props.deleteStream(id);
    history.push("/");
    document.location.reload();
  }
  render() {
    console.log("render deleteStream ", this.props.stream);
    return (
      <div>
        <Modal
          title="Delete Stream"
          content="Are you sure you want to delete this stream!"
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.params.id] };
};
export default withRouter(
  connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
);
