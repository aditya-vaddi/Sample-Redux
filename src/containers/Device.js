import { connect } from 'react-redux';
import { onHeaderClickAction } from '../actions/navigationActions';
import DeviceListScreen from '../components/DeviceListScreen';

const mapStateToProps = (state) => { // state: not filtered yet
    return {
      customers:state.deviceReducer.devicesPayload.customers,
      sectionID: state.listReducer.sectionID,
      expand: state.listReducer.expand
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onHeaderClick: (sectionID, expand) => dispatch(onHeaderClickAction(sectionID, expand))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceListScreen);
