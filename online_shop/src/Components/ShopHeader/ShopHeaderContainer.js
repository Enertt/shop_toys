import ShopHeader from "./ShopHeader";
import { connect } from "react-redux";
import { getProductsWThunkCreator, getNewProductsThunkCreator, setPreloadInputAC } from "../../redux/shopReduser";

let mapStateToProps = (state) => ({
    categories: state.shopReduser.categories,
    preloadInput: state.shopReduser.preloadInput,
    loading: state.shopReduser.loading,
});

export default connect(mapStateToProps, {getProductsWThunkCreator, getNewProductsThunkCreator, setPreloadInputAC})(ShopHeader)