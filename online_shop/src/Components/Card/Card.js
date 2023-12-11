import s from './card.module.css'
import photo from '../../assets/gallery/for_small.png'

const Card = (props) => {
    return(
        <div className={s.wrapper} onClick={()=>{
            if(props.setIsCardOpen && props.setOpenedCardElement){
                props.setOpenedCardElement(props.element)
                props.setIsCardOpen(true)
            }
            }}>
            <div className={s.content}>
                {props.element.isNew && (
                    <div className={s.new}>NEW</div>
                )}
                <div className={s.img}>
                    <img src={`http://localhost:3001/files/${props.element.img}`}/>

                </div>
                <div className={s.description}>
                    <div className={s.descriptionContent}>
                        <span className={s.priceSpan}>{`${props.element.cost} грн`}</span>
                        <span className={s.nameSpan}>{props.element.title}</span>
                        <div className={s.descriptionContentId}>
                            <span className={s.numberSpan}>{`№ ${props.element.id}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card