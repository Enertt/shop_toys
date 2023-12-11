import s from './admin.module.css'
import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { API } from '../../api/api'
import { useNavigate } from 'react-router-dom';


const Admin = (props) => {
    const navigateToLogin = useNavigate()
    if(!props.isAuth){
        navigateToLogin('/admin_login')
    }

    const [searchState, setSearchState] = useState('')
    const [foundedProductState, setFoundedProductState] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [newFormState, setNewFormState] = useState(false)
    const [modFormState, setModFormState] = useState(false)
    const [delState, setDelState] = useState(false)
    const [resetNewState, setResetNewState] = useState(false)

    const [modId, setModId] = useState(null)
    const [modTitle, setModTitle] = useState(null)
    const [modCost, setModCost] = useState(null)
    const [modPhrases, setModPhrases] = useState(null)
    const [modCategories, setModCategories] = useState(null)
    const [modDate, setModDate] = useState(null)
    const [modDescription, setModDescription] = useState(null)
    const [modIsNew, setModIsNew] = useState(null)

    const [costState, setCostState] = useState('')
    const [titleState, setTitleState] = useState('')
    const [categoriesState, setCategoriesState] = useState([])
    const [tagsState, setTagsState] = useState([])
    const [descriptionState, setDescriptionState] = useState('')
    const [imgState, setImgState] = useState(null)

    const [oneTagState, setOneTagState] = useState('')

    const [selectState, setSelectState] = useState(false)

    const handleOptionChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);
        setCategoriesState(selectedOptions);
    };

    useEffect(() => {
        if (foundedProductState) {
            setModId(foundedProductState.id)
            setModTitle(foundedProductState.title)
            setModCost(foundedProductState.cost)
            setModPhrases(foundedProductState.searchWords)
            setModCategories(foundedProductState.category)
            setModDate(foundedProductState.date)
            setModDescription(foundedProductState.description)
            setModIsNew(foundedProductState.isNew)
        }
    }, [foundedProductState])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setImgState(file);
            };
            reader.readAsDataURL(file);
        }
    };

    let categoriesObject = {
        _1: false,
        _2: false,
        _3: false,
        _4: false,
        _5: false,
        _6: false,
        _7: false,
        _8: false,
        _9: false
    }

    return (
        <div className={s.wrapper}>
            <div className={s.addBlock}>
                <button className={s.addBlockButton} onClick={() => { setNewFormState(true) }}>Добавить позицию</button>
            </div>

            {selectState && (
                <div className={s.selectWrapper}>
                    <div className={s.selectWrapper_select}>
                        <input type='checkbox' onChange={() => { categoriesObject._1 = !categoriesObject._1 }}></input>
                        <span>Ляльки</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._2 = !categoriesObject._2 }}></input>
                        <span>Машинки</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._3 = !categoriesObject._3 }}></input>
                        <span>Для найменших</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._4 = !categoriesObject._4 }}></input>
                        <span>Iнтерактивнi</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._5 = !categoriesObject._5 }}></input>
                        <span>Розвиваючi</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._6 = !categoriesObject._6 }}></input>
                        <span>Солдатики</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._7 = !categoriesObject._7 }}></input>
                        <span>Конструктор</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._8 = !categoriesObject._8 }}></input>
                        <span>Пiстолетики</span><br />
                        <input type='checkbox' onChange={() => { categoriesObject._9 = !categoriesObject._9 }}></input>
                        <span>Динозаври</span><br />
                    </div>
                    <button className={s.modButton} onClick={() => {
                        if (categoriesObject._1) {
                            setCategoriesState(prev => [...prev, "Ляльки"])
                        }
                        if (categoriesObject._2) {
                            setCategoriesState(prev => [...prev, "Машинки"])
                        }
                        if (categoriesObject._3) {
                            setCategoriesState(prev => [...prev, "Для найменших"])
                        }
                        if (categoriesObject._4) {
                            setCategoriesState(prev => [...prev, "Iнтерактивнi"])
                        }
                        if (categoriesObject._5) {
                            setCategoriesState(prev => [...prev, "Розвиваючi"])
                        }
                        if (categoriesObject._6) {
                            setCategoriesState(prev => [...prev, "Солдатики"])
                        }
                        if (categoriesObject._7) {
                            setCategoriesState(prev => [...prev, "Конструктор"])
                        }
                        if (categoriesObject._8) {
                            setCategoriesState(prev => [...prev, "Пiстолетики"])
                        }
                        if (categoriesObject._9) {
                            setCategoriesState(prev => [...prev, "Динозаври"])
                        }
                        setSelectState(false)
                    }}>Сохранить</button>
                </div>
            )}
            {newFormState && (
                <div className={s.newForm}>
                    <div className={s.newFormContent}>
                        <div className={s.newFormItem}>
                            <input type='file' className={s.imgInput} onChange={handleFileChange}></input>
                            {imgState && <img className={s.smallImg} src={URL.createObjectURL(imgState)} alt="Selected" />}

                            <span>Цена</span>
                            <input className={s.infoInput} placeholder='35' value={costState} onChange={(e) => { setCostState(e.target.value) }}></input>
                            <span>Название</span>
                            <input className={s.infoInput} placeholder='Лiтачок' value={titleState} onChange={(e) => { setTitleState(e.target.value) }}></input>

                            <button className={s.openSelect} onClick={() => {
                                setCategoriesState([])
                                setSelectState(true)
                            }}>Выбрать категории</button>
                            {categoriesState.length > 0 && (<textarea className={s.textarea} value={categoriesState} />)}

                            <span>Теги для поиска</span>
                            <div className={s.infoInputBlock}>
                                <input className={s.infoInput} placeholder='Лiтак' value={oneTagState} onChange={(e) => { setOneTagState(e.target.value) }}></input>
                                {oneTagState.length > 0 && (<div className={s.saveTag} onClick={() => {
                                    setTagsState(prev => [...prev, oneTagState])
                                    setOneTagState('')
                                }}>SAVE</div>)}
                            </div>
                            {tagsState.length > 0 && (<textarea className={s.textarea} value={tagsState} />)}
                            <span>Описание</span>
                            <textarea 
                            className={s.textarea} 
                            value={descriptionState} 
                            onChange={(e)=>{setDescriptionState(e.target.value)}}></textarea>
                        </div>
                        <button className={s.modButton} onClick={() => {
                            try {
                                API.uploadData(costState, titleState, categoriesState, tagsState, descriptionState, props.token).then(res => {

                                    const imgToUpload = new FormData()
                                    imgToUpload.append('file', imgState)
                                    imgToUpload.append('token', props.token)

                                    API.uploadImg(imgToUpload).then(resp => {
                                        setNewFormState(false)
                                    })

                                })

                                setNewFormState(false)
                                setCostState('')
                                setTitleState('')
                                setTagsState('')
                                setDescriptionState('')
                                setImgState(null)
                            } catch (error) {
                                setNewFormState(false)
                                setCostState('')
                                setTitleState('')
                                setTagsState('')
                                setDescriptionState('')
                                setImgState(null)
                                console.log(error)
                            }
                        }}>Сохранить</button>
                        <button className={s.delButton} onClick={() => {
                            setNewFormState(false)
                            setCostState('')
                            setTitleState('')
                            setTagsState('')
                            setImgState(null)
                        }}>Отменить</button>
                    </div>
                </div>
            )}

            {modFormState && foundedProductState && (
                <div className={s.modFormWrapper}>
                    <div className={s.modFormWrapper__item}>
                        <span>Название</span>
                        <textarea value={modTitle} onChange={(e) => { setModTitle(e.target.value) }}></textarea>
                    </div>
                    <div className={s.modFormWrapper__item}>
                        <span>Цена</span>
                        <textarea value={modCost} onChange={(e) => { setModCost(e.target.value) }}></textarea>
                    </div>
                    <div className={s.modFormWrapper__item}>
                        <span>Поисковые фразы</span>
                        <textarea value={modPhrases} onChange={(e) => { setModPhrases(e.target.value) }}></textarea>
                    </div>
                    <div className={s.modFormWrapper__item}>
                        <span>Категории</span>
                        <textarea value={modCategories} onChange={(e) => { setModCategories(e.target.value) }}></textarea>
                    </div>
                    <div className={s.modFormWrapper__item}>
                        <span>Дата</span>
                        <textarea value={modDate} onChange={(e) => { setModDate(e.target.value) }}></textarea>
                    </div>
                    <div className={s.modFormWrapper__item}>
                        <span>Описание</span>
                        <textarea value={modDescription} onChange={(e) => { setModDescription(e.target.value) }}></textarea>
                    </div>
                    <div className={s.modFormWrapper__item}>
                        <span>isNew</span>
                        <textarea value={modIsNew} onChange={(e) => { setModIsNew(e.target.value) }}></textarea>
                    </div>
                    <button className={s.modButton} onClick={() => {
                        let splitedStrP
                        let splitedStrC

                        if (typeof modPhrases === "string") {
                            splitedStrP = modPhrases.split(',')
                            setModPhrases(splitedStrP)

                        }else if(!splitedStrP){
                            splitedStrP = modPhrases
                        }
                        if (typeof modCategories === "string") {
                            splitedStrC = modCategories.split(',')
                            setModCategories(splitedStrC)
                        }else if(!splitedStrC){
                            splitedStrC = modCategories
                        }
                        debugger
                        API.changeData(
                            modId,
                            modTitle,
                            modCost,    
                            splitedStrP,
                            splitedStrC,
                            modDate,
                            modDescription,
                            modIsNew,
                            props.token
                        ).then((response) => {
                            
                            setFoundedProductState({
                                id: response.id,
                                img: response.img,
                                title: response.title,
                                cost: response.cost,
                                searchWords: response.searchWords,
                                category: response.category,
                                date: response.date,
                                description: response.description,
                                isNew: response.isNew
                            })
                        })

                        setModFormState(!modFormState)
                    }}>Сохранить</button>
                    <button className={s.delButton} onClick={() => { setModFormState(!modFormState) }}>Отменить</button>
                </div>
            )}
            {delState && (
                <div className={s.delWrapper}>
                    <div className={s.delWrapper__modal}>
                        <button onClick={() => {
                            if (foundedProductState.id) {
                                API.deleteData(foundedProductState.id, props.token)
                            }
                            setSearchState('')
                            setFoundedProductState(null)
                            setDelState(false)
                        }} className={s.delWrapper__modal__button}>Подтвердить</button>
                        <button onClick={() => { setDelState(false) }} className={s.delWrapper__modal__button}>Отмена</button>
                    </div>
                </div>
            )}

            {resetNewState && (
                <div className={s.delWrapper}>
                    <div className={s.delWrapper__modal}>
                        <button onClick={() => {

                            API.resetNew(props.token)
                            
                            setResetNewState(false)
                        }} className={s.delWrapper__modal__button}>Подтвердить</button>
                        <button onClick={() => { setResetNewState(false) }} className={s.delWrapper__modal__button}>Отмена</button>
                    </div>
                </div>
            )}

            <div className={s.searchBlock}>

                <div className={s.searchPanel}>
                    <span className={s.searchPanel_span}>Поиск</span>
                    <div className={s.searchPanel_inputBlock}>
                        <input className={s.searchPanel_input} 
                        placeholder='Номер позиции' 
                        value={searchState} 
                        onChange={(event) => { setSearchState(event.target.value) }}
                        onKeyDown={(event)=>{
                            if (event.key === 'Enter') {
                                event.preventDefault(); // Предотвращаем действие по умолчанию, чтобы избежать отправки формы или других действий.
                                
                                if (searchState && searchState !== '') {
                                  try {
                                    setFoundedProductState(null);
                                    setIsSearching(true);
                                    API.getProductsById(searchState).then((res) => {
                                      setIsSearching(false);
                                      setFoundedProductState(res);
                                    });
                                  } catch (error) {
                                    setIsSearching(false);
                                    console.log(error);
                                  }
                                }else{
                                    setSearchState('')
                                    setFoundedProductState(null)
                                }
                              }
                        }}></input>
                        <button className={s.searchPanel_button} onClick={() => {
                            if(searchState && searchState !== ''){
                                try {
                                    setFoundedProductState(null)
                                    setIsSearching(true)
                                    API.getProductsById(searchState).then(res => {
                                        setIsSearching(false)
                                        setFoundedProductState(res)
                                    })
                                } catch (error) {
                                    setIsSearching(false)
                                    console.log(error)
                                }
                            }else{
                                setSearchState('')
                                setFoundedProductState(null)
                            }
                        }}>
                            <svg className={s.searchPanel_buttonSvg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={s.searchResult}>
                    <div className={s.searchResultItem}>

                        {!foundedProductState && (
                            <div className={s.content}>
                                <div className={s.img}>
                                </div>
                                <div className={s.description}>
                                    <div className={s.descriptionContent}>
                                        <span className={s.priceSpan}>{'.............'}</span>
                                        <span className={s.priceSpan}>{'......................................'}</span>
                                        <span className={s.priceSpan}>{'.............................'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {foundedProductState && (<Card element={foundedProductState} />)}

                    </div>
                    <button onClick={() => { setModFormState(!modFormState) }} className={s.modButton}>Модифицировать</button>
                    <button onClick={() => {
                        if (foundedProductState) {
                            setDelState(true)
                        }
                    }} className={s.delButton}>Удалить</button>
                </div>

                <div className={s.addBlock}>
                    <button className={s.addBlockButton} onClick={() => { setResetNewState(true) }}>Обновить параметр "NEW"</button>
                </div>
            </div>
        </div>
    )
}

export default Admin