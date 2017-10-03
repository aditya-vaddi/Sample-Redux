import { connect } from 'react-redux';
// Import actions
//import { setVisibilityFilter } from '../actions';
// Presentational component to connect to
import List from '../components/list/List';

// state/data
const mapStateToProps = (state, ownProps) => ({});
// action/behavior
const mapDispatchToProps = (dispatch, ownProps) => ({});

// Connect container to presentational component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
