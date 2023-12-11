import Gallery from "./Gallery";
import { connect } from "react-redux";
import { setPreloadCategoryAC } from "../../redux/shopReduser";

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{setPreloadCategoryAC})(Gallery)