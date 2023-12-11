import { connect } from "react-redux";
import SearchLine from "./SearchLine";
import { setPreloadCategoryAC, setPreloadInputAC } from "../../redux/shopReduser";

let mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {setPreloadCategoryAC, setPreloadInputAC})(SearchLine);