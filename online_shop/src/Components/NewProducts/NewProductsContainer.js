import NewProducts from "./NewProducts";
import { connect } from "react-redux";
import { getNewProductsThunkCreator } from "../../redux/shopReduser";

let mapStateToProps = (state) => ({
    loading: state.shopReduser.loading,
    productsW: state.shopReduser.productsW,
});

export default connect(mapStateToProps, {getNewProductsThunkCreator})(NewProducts)