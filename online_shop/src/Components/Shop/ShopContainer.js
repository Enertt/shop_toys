import Shop from "./Shop";
import { connect } from "react-redux";
import { getProductsWThunkCreator, getProductsCThunkCreator, 
    getNewProductsThunkCreator, setCategoriesAC, setProductsWAC, 
    setProductsCAC, setPreloadCategoryAC, setPreloadInputAC
} from "../../redux/shopReduser";


let mapStateToProps = (state) => ({
    productsW: state.shopReduser.productsW,
    productsC: state.shopReduser.productsC,
    preloadCategory: state.shopReduser.preloadCategory,
    preloadInput: state.shopReduser.preloadInput,
});

export default connect(mapStateToProps, {getProductsWThunkCreator, getProductsCThunkCreator, 
    getNewProductsThunkCreator, setCategoriesAC, setProductsWAC, setProductsCAC, setPreloadCategoryAC,
    setPreloadInputAC})(Shop)