import React from "react";
import { fetchStreams } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdminControl(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <td className="right aligned">
          <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </td>
      );
    }
  }
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link className="ui button primary" to="/streams/new">
            Create Stream
          </Link>
        </div>
      );
    }
  }
  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <tr key={stream.id}>
          <td className="ui button content">
            <i className="small middle aligned video icon"></i>
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
          </td>

          <td className="description">{stream.description}</td>
          {this.renderAdminControl(stream)}
        </tr>
      );
    });
  }
  render() {
    console.log(this.props.streams);
    return (
      <div>
        <h3>StreamList</h3>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
