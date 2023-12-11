import s from './main.module.css'
import { useState } from 'react'
import Header from '../Header/Header'
import Card from '../Card/Card'
import SearchLineContainer from '../SearchLine/SearchLineContainer'
import GalleryContainer from '../CategotyGalerry/GalleryContainer'
import NewProductsContainer from '../NewProducts/NewProductsContainer'

const Main = () => {

    const [isCardOpen, setIsCardOpen] = useState(false)
    const [openedCardElement, setOpenedCardElement] = useState(null)

    return(
        <div className={s.wrapper}>
            <Header headerState={null}/>
            <SearchLineContainer />
            <div className={s.galleryWrapper}>
                <GalleryContainer />
            </div>
            
            <NewProductsContainer setOpenedCardElement={setOpenedCardElement} setIsCardOpen={setIsCardOpen}/>

            {isCardOpen && (
                <div className={s.openCardWrapper}>
                    <div className={s.openCardWrapper__modal}>
                        <svg onClick={()=>{setIsCardOpen(false)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>

                        <div className={s.openCardWrapper__modal__cardBlock}>
                            <Card element={openedCardElement}/>
                            <button className={s.openCardWrapper__modal__cardBlock__orderButton}>ЗАМОВИТИ</button>
                        </div>

                        <div className={s.openCardWrapper__modal__descriptionBlock}>
                            <span className={s.openCardWrapper__modal__descriptionBlock__descriptionSpan}>Опис</span>
                            <p className={s.openCardWrapper__modal__descriptionBlock__descriptionP}>{openedCardElement.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main