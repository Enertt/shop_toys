import s from './shop.module.css'
import ShopHeaderContainer from '../ShopHeader/ShopHeaderContainer'
import Card from '../Card/Card'
import { useState } from 'react'
import { useEffect } from 'react'

const Shop = (props) => {
    const [isCardOpen, setIsCardOpen] = useState(false)
    const [openedCardElement, setOpenedCardElement] = useState(null)

    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchResult, setSearchResult] = useState([])
    const [searchInputState, setSearchInputState] = useState(null)
    const [categoriesState, setCategoriesState] = useState([])

    const [sortState, setSortState] = useState(null)

    const [li1, setLi1] = useState(false)
    const [li2, setLi2] = useState(false)
    const [li3, setLi3] = useState(false)
    const [li4, setLi4] = useState(false)
    const [li5, setLi5] = useState(false)
    const [li6, setLi6] = useState(false)
    const [li7, setLi7] = useState(false)
    const [li8, setLi8] = useState(false)
    const [li9, setLi9] = useState(false)

    useEffect(() => {
        let trueStates = []
        if (li1) {
            trueStates.push('Ляльки')
        }
        if (li2) {
            trueStates.push('Машинки')
        }
        if (li3) {
            trueStates.push('Для найменших')
        }
        if (li4) {
            trueStates.push('Iнтерактивнi')
        }
        if (li5) {
            trueStates.push('Розвиваючi')
        }
        if (li6) {
            trueStates.push('Солдатики')
        }
        if (li7) {
            trueStates.push('Конструктор')
        }
        if (li8) {
            trueStates.push('Пiстолетики')
        }
        if (li9) {
            trueStates.push('Динозаври')
        }

        setCategoriesState(trueStates)
        props.setProductsWAC([])
        props.setProductsCAC([])

        if ((searchInputState === "" || !searchInputState) && trueStates.length === 0 && !props.preloadCategory) {
            props.getNewProductsThunkCreator()
        }

        if (trueStates.length > 0) {
            props.getProductsCThunkCreator(trueStates)
        }
        if (searchInputState !== "" && searchInputState) {
            debugger
            props.getProductsWThunkCreator(searchInputState)
        }
    }, [li1, li2, li3, li4, li5, li6, li7, li8, li9])



    useEffect(() => {
        setSearchResult(props.productsW)
        if (props.productsC.length > 0) {
            props.productsC.map((element) => {
                setSearchResult(prev => [...prev, element])
            })
        }
    }, [props.productsW, props.productsC])

    const renderCards = () => {
        if (searchResult) {
            if (!sortState) {
                return searchResult.map((el) => {
                    return <Card element={el} setIsCardOpen={setIsCardOpen} setOpenedCardElement={setOpenedCardElement} />
                })
            }
            if (sortState === 'costLow') {
                const sortedSearchResult = [...searchResult].sort((a, b) => a.cost - b.cost);

                return sortedSearchResult.map((el) => {
                    return <Card element={el} setIsCardOpen={setIsCardOpen} setOpenedCardElement={setOpenedCardElement} />;
                });
            }
            if (sortState === 'costBig') {
                const sortedSearchResult = [...searchResult].sort((a, b) => b.cost - a.cost);

                return sortedSearchResult.map((el) => {
                    return <Card element={el} setIsCardOpen={setIsCardOpen} setOpenedCardElement={setOpenedCardElement} />;
                });
            }
            if (sortState === 'dateNew') {
                const sortedSearchResult = [...searchResult].sort((a, b) => b.id - a.id);

                return sortedSearchResult.map((el) => {
                    return <Card element={el} setIsCardOpen={setIsCardOpen} setOpenedCardElement={setOpenedCardElement} />;
                });
            }
            if (sortState === 'costOld') {
                const sortedSearchResult = [...searchResult].sort((a, b) => a.id - b.id);

                return sortedSearchResult.map((el) => {
                    return <Card element={el} setIsCardOpen={setIsCardOpen} setOpenedCardElement={setOpenedCardElement} />;
                });
            }
        }
    }

    useEffect(() => {

        if (props.preloadCategory === 'Ляльки') {

            setLi1(true)
            props.getProductsCThunkCreator(['Ляльки'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Машинки') {

            setLi2(true)
            props.getProductsCThunkCreator(['Машинки'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Для найменших') {

            setLi3(true)
            props.getProductsCThunkCreator(['Для найменших'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Iнтерактивнi') {

            setLi4(true)
            props.getProductsCThunkCreator(['Iнтерактивнi'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Розвиваючi') {

            setLi5(true)
            props.getProductsCThunkCreator(['Розвиваючi'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Солдатики') {

            setLi6(true)
            props.getProductsCThunkCreator(['Солдатики'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Конструктор') {

            setLi7(true)
            props.getProductsCThunkCreator(['Конструктор'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Пiстолетики') {

            setLi8(true)
            props.getProductsCThunkCreator(['Пiстолетики'])
            props.setPreloadCategoryAC(null)
        }
        if (props.preloadCategory === 'Динозаври') {

            setLi9(true)
            props.getProductsCThunkCreator(['Динозаври'])
            props.setPreloadCategoryAC(null)
        }

        if (props.preloadInput) {
            props.getProductsWThunkCreator(props.preloadInput)
            setSearchInputState(props.preloadInput)
        }

        // Функция, которая будет вызываться при скролле
        function handleScroll() {
            // Обновляем значение scrollPosition при скролле
            setScrollPosition(window.scrollY);
        }

        // Добавляем обработчик события скролла при монтировании компонента
        window.addEventListener('scroll', handleScroll);

        // Убираем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
            props.setPreloadCategoryAC(null)
        };
    }, []);

    return (
        <div className={s.wrapper}>
            <ShopHeaderContainer
                searchInputState={searchInputState}
                setSearchInputState={setSearchInputState}
                categoriesState={categoriesState}
                setSortState={setSortState}
            />

            <div className={s.shopBlock}>
                {scrollPosition < 120 && (<div className={s.shopCategories}>
                    <div className={s.shopCategoriesContent}>
                        <span className={s.shopCategoriesContentSpan}>Категорії</span>
                        <ul>
                            <li className={li1 ? s.active_li : null} onClick={() => {
                                setLi1(!li1)
                            }}>Ляльки</li>
                            <li className={li2 ? s.active_li : null} onClick={() => {
                                setLi2(!li2)
                            }}>Машинки</li>
                            <li className={li3 ? s.active_li : null} onClick={() => {
                                setLi3(!li3)
                            }}>Для найменших</li>
                            <li className={li4 ? s.active_li : null} onClick={() => {
                                setLi4(!li4)
                            }}>Iнтерактивнi</li>
                            <li className={li5 ? s.active_li : null} onClick={() => {
                                setLi5(!li5)
                            }}>Розвиваючi</li>
                            <li className={li6 ? s.active_li : null} onClick={() => {
                                setLi6(!li6)
                            }}>Солдатики</li>
                            <li className={li7 ? s.active_li : null} onClick={() => {
                                setLi7(!li7)
                            }}>Конструктор</li>
                            <li className={li8 ? s.active_li : null} onClick={() => {
                                setLi8(!li8)
                            }}>Пiстолетики</li>
                            <li className={li9 ? s.active_li : null} onClick={() => {
                                setLi9(!li9)
                            }}>Динозаври</li>
                        </ul>
                    </div>
                </div>)}

                {scrollPosition >= 120 && (<div className={s.shopCategories_fixed}>
                    <div className={s.shopCategoriesContent}>
                        <span className={s.shopCategoriesContentSpan}>Категорії</span>
                        <ul>
                            <li className={li1 ? s.active_li : null} onClick={() => {
                                setLi1(!li1)
                            }}>Ляльки</li>
                            <li className={li2 ? s.active_li : null} onClick={() => {
                                setLi2(!li2)
                            }}>Машинки</li>
                            <li className={li3 ? s.active_li : null} onClick={() => {
                                setLi3(!li3)
                            }}>Для найменших</li>
                            <li className={li4 ? s.active_li : null} onClick={() => {
                                setLi4(!li4)
                            }}>Iнтерактивнi</li>
                            <li className={li5 ? s.active_li : null} onClick={() => {
                                setLi5(!li5)
                            }}>Розвиваючi</li>
                            <li className={li6 ? s.active_li : null} onClick={() => {
                                setLi6(!li6)
                            }}>Солдатики</li>
                            <li className={li7 ? s.active_li : null} onClick={() => {
                                setLi7(!li7)
                            }}>Конструктор</li>
                            <li className={li8 ? s.active_li : null} onClick={() => {
                                setLi8(!li8)
                            }}>Пiстолетики</li>
                            <li className={li9 ? s.active_li : null} onClick={() => {
                                setLi9(!li9)
                            }}>Динозаври</li>
                        </ul>
                    </div>
                </div>)}

                <div className={s.shopElementsBlock}>
                    <div className={s.cardBlock}>
                        {searchResult.length === 0 && (
                            <span className={s.noResultsSpan}>По Вашому запиту нiчого не знайдено :(</span>
                        )}
                        {renderCards()}
                    </div>
                </div>
            </div>

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

export default Shop