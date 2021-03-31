import { connect } from 'react-redux';
import Auth from './Auth';
import { checkUserDB } from '../../redux/reducers/auth-reducer';

const mapStateToProps = (state) => {
  return {
    isConnect: state.auth.isConnect,
    error: state.auth.error,
  };
};

const mapDispatchToProps = {
  checkUserDB,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
