import s from './newProducts.module.css'
import Card from '../Card/Card'
import { useState, useEffect } from 'react'
import { API } from '../../api/api'
import Preloader from '../../Preloader/Preloader'


const NewProducts = (props) => {

    useEffect(()=>{
        // try {
            props.getNewProductsThunkCreator()
        // } catch (error) {

        // }
    },[])

    const renderCards = () => {
        if(props.productsW && props.productsW.length > 0){
            return props.productsW.map((element) => {
                return(
                    <Card 
                    element={element} 
                    setOpenedCardElement={props.setOpenedCardElement} 
                    setIsCardOpen={props.setIsCardOpen}
                    />
                )
            })
        }
    }

    return(
        props.productsW && props.productsW.length > 0 && (
            <div className={s.wrapper}>
            <span className={s.titleSpan}>НАШI НОВИНКИ</span>

            <div className={s.cardBlock}>
                {props.loading && (
                    <div className={s.loading}>
                        <Preloader/>
                    </div>
                )}
                {renderCards()}
            </div>
            
        </div>
        )
    )
}

export default NewProducts