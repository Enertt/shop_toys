import s from './shopHeader.module.css'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Preloader from '../../Preloader/Preloader'
import { API } from '../../api/api'

const ShopHeader = (props) => {

    const [sortWindowState, setSortWindowState] = useState(false)

    useEffect(() => {
        props.setPreloadInputAC(null)
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.headerContent}>
                <NavLink to='/'><img className={s.logoImg} src={logo} /></NavLink>

                <div className={s.searchBlock}>
                    <div className={s.search} onClick={() => { setSortWindowState(!sortWindowState) }}>
                        <span className={s.searchSpan}>Сортування</span>

                        {!sortWindowState && (
                            <svg className={s.searchSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                        )}

                        {sortWindowState && (
                            <svg className={s.searchSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg>
                        )}

                        {sortWindowState && (
                            <div className={s.search__sortWindow}>
                                <span className={s.search__sortWindow__span} onClick={()=>{props.setSortState(null)}}>Без сортування</span>
                                <span className={s.search__sortWindow__span} onClick={()=>{props.setSortState('costLow')}}>Ціна: від найдешевшого</span>
                                <span className={s.search__sortWindow__span} onClick={()=>{props.setSortState('costBig')}}>Ціна: від найдорожчого</span>
                                <span className={s.search__sortWindow__span} onClick={()=>{props.setSortState('dateNew')}}>Дата: від найновішого</span>
                                <span className={s.search__sortWindow__span} onClick={()=>{props.setSortState('costOld')}}>Дата: від найдавнішого</span>
                            </div>
                        )}
                    </div>

                    <input
                        className={s.searchInput}
                        placeholder='Пошук товару...'
                        value={props.searchInputState}
                        onChange={(e) => { props.setSearchInputState(e.target.value) }}
                        onKeyDown={(e) => {
                            debugger
                            if (e.key === 'Enter' && (props.searchInputState && props.searchInputState !== '')) {
                                e.preventDefault(); // Чтобы предотвратить отправку формы (если есть)
                                props.getProductsWThunkCreator(props.searchInputState);
                            }
                            if (e.key === 'Enter' && (!props.searchInputState || props.searchInputState === '') && props.categoriesState.length === 0) {
                                props.getNewProductsThunkCreator()
                            }
                        }}
                    ></input>

                    {props.loading && (
                        <Preloader/>
                    )}

                    <div className={s.searchButton} onClick={() => {
                        if ((props.searchInputState && props.searchInputState !== '')) {
                            props.getProductsWThunkCreator(props.searchInputState);
                        }
                        if ((!props.searchInputState || props.searchInputState === '') && props.categoriesState.length === 0) {
                            props.getNewProductsThunkCreator()
                        }
                    }}>
                        <svg className={s.searchButtonSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShopHeader