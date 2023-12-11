import { connect } from "react-redux";
import AdminLogin from "./AdminLogin";
import { setTokenThunkCreator } from "../../redux/authReduser";

let mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {setTokenThunkCreator})(AdminLogin);