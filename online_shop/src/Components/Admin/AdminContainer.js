import { connect } from "react-redux";
import Admin from "./Admin";

let mapStateToProps = (state) => ({
    token: state.authReduser.token,
    isAuth: state.authReduser.isAuth,
});

export default connect(mapStateToProps, {})(Admin);