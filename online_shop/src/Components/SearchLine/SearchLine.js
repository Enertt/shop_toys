import s from './searchLine.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const SearchLine = (props) => {

    const [categoriesButtonState, setCategoriesButtonState] = useState(false)
    const [searchState, setSearchState] = useState('')
    const navigate = useNavigate();
    

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={categoriesButtonState ? s.categoriesBlock__openModal : s.categoriesBlock} onClick={() => { setCategoriesButtonState(!categoriesButtonState) }}>
                    <span className={s.categoriesSpan}>КАТЕГОРІЇ</span>

                    {!categoriesButtonState && (
                        <svg className={s.categoriesSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    )}

                    {categoriesButtonState && (
                        <svg className={s.categoriesSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg>
                    )}

                    {categoriesButtonState && (
                        <div className={s.categoriesModal}>
                            {/* <span className={s.categoriesSpan}>КАТЕГОРІЇ</span>

                            <svg className={s.categoriesSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg> */}
                            <ul>
                            <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Ляльки')}}><li className={s.active_li} onClick={() => { }}>Ляльки</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Машинки')}}><li className={s.active_li} onClick={() => { }}>Машинки</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Для найменших')}}><li className={s.active_li} onClick={() => { }}>Для найменших</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Iнтерактивнi')}}><li className={s.active_li} onClick={() => { }}>Iнтерактивнi</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Розвиваючi')}}><li className={s.active_li} onClick={() => { }}>Розвиваючi</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Солдатики')}}><li className={s.active_li} onClick={() => { }}>Солдатики</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Конструктор')}}><li className={s.active_li} onClick={() => { }}>Конструктор</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Пiстолетики')}}><li className={s.active_li} onClick={() => { }}>Пiстолетики</li></NavLink>
                                
                                <NavLink to={'/shop'} className={s.smallBlock_imgBlock} onClick={()=>{
                            props.setPreloadCategoryAC('Динозаври')}}><li className={s.active_li} onClick={() => { }}>Динозаври</li></NavLink>
                                
                            </ul>
                        </div>
                    )
                    }
                </div>
                <div className={s.searchBlock}>
                    {/* <div className={s.search}>
                        <span className={s.searchSpan}>Усі категорії</span>

                        <svg className={s.searchSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div> */}

                    <input className={s.searchInput} value={searchState} onChange={(e)=>{setSearchState(e.target.value)}} placeholder='Пошук товару...'  onKeyPress={(e) => {
                        if (e.key === 'Enter' && (searchState !== '')) {
                          e.preventDefault(); // Чтобы предотвратить отправку формы (если есть)
                          
                          props.setPreloadInputAC(searchState);
                          navigate('/shop');
                        }
                      }}></input>

                    <div className={s.searchButton} onClick={()=>{
                        if (searchState !== '') {
                            props.setPreloadInputAC(searchState);
                            navigate('/shop');
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

export default SearchLine