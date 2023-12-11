import s from './preloader.module.css'
import loadingGif from '../assets/loading/loading.gif'

const Preloader = () => {
    return(
        <div className={s.wrapper}>
            <img src={loadingGif} />
        </div>
    )
}

export default Preloader