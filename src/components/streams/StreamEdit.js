import React from "react";
import { connect } from "react-redux";
import withRouter from "../../withRouter";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.params.id);
  }

  onSubmit = (formValues) => {
    console.log("form edit onSubmit StreamEdit");
    console.log(formValues);
    this.props.editStream(this.props.params.id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading Stream</div>;
    }
    const { id, userId, ...editedValues } = this.props.stream;
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm initialValues={editedValues} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.params.id] };
};
export default withRouter(
  connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)
);
