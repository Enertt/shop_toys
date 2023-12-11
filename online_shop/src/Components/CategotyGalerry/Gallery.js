import s from './gallery.module.css'
import dollImg from '../../assets/gallery/doll.jpg'
import carsImg from '../../assets/gallery/cars.png'
import forLittleImg from '../../assets/gallery/for_small.png'
import interactiveImg from '../../assets/gallery/interactive.jpg'
import educationImg from '../../assets/gallery/educational_toys.jpg'
import { NavLink } from 'react-router-dom'

const Gallery = (props) => {
    return(
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.smallBlock}>
                    <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                        props.setPreloadCategoryAC('Iнтерактивнi')}}>
                        <img src={interactiveImg} />
                        <span>ІНТЕРАКТИВНІ</span>
                    </NavLink>

                    <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{props.setPreloadCategoryAC('Розвиваючi')}}>
                        <img src={educationImg} />
                        <span>РОЗВИВАЮЧІ</span>
                    </NavLink>
                </div>

                <div className={s.bigBlock}>
                    <NavLink to={'/shop'} className={s.bigBlock_imgBlock} onClick={()=>{props.setPreloadCategoryAC('Ляльки')}}>
                        <img src={dollImg} />
                        <span>ЛЯЛЬКИ</span>
                    </NavLink>
                </div>

                <div className={s.smallBlock}>
                    <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{props.setPreloadCategoryAC('Машинки')}}>
                        <img src={carsImg} />
                        <span>МАШИНКИ</span>
                    </NavLink>
                    <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{props.setPreloadCategoryAC('Для найменших')}}>
                        <img src={forLittleImg} />
                        <span>ДЛЯ НАЙМЕНШИХ</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
} 

export default Gallery