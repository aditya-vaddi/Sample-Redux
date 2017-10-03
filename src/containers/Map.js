import { connect } from 'react-redux';
// Import actions
//import { setVisibilityFilter } from '../actions';
// Presentational component to connect to
import Map from '../components/Map';

// state/data
const mapStateToProps = (state, ownProps) => ({});
// action/behavior
const mapDispatchToProps = (dispatch, ownProps) => ({});

// Connect container to presentational component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
