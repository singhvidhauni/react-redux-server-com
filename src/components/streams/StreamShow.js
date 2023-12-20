import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import withRouter from "../../withRouter";
class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.params.id);
    console.log(this.props.params.id);
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading....</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.params.id, "state stream ", state.stream);
  return { stream: state.streams[ownProps.params.id] };
};
export default withRouter(
  connect(mapStateToProps, { fetchStream })(StreamShow)
);
