import s from './contacts.module.css'
import Header from '../Header/Header'
import viber from '../../assets/images/viber.png'
import group from '../../assets/images/group_img.png'
import instagram from '../../assets/images/instagram.png'
import tiktok from '../../assets/images/tiktok.png'

const Contacts = () => {
    return (
        <div className={s.wrapper}>
            <Header headerState={'Contacts'} />

            <div className={s.wrapper__content}>
                <a href='https://invite.viber.com/?g2=AQBKWWWUhYO3JFGddEM0fanrjg93TiGqWOjxJYr4ToGOTkkn6eLzqMKbnlgQFAN2' 
                target="_blank" className={s.wrapper__content__viberBlock}>
                    <span className={s.wrapper__content__viberBlock__span}>Головне джерело</span>
                    <img className={s.wrapper__content__viberBlock__img} src={viber} />
                    <div className={s.wrapper__content__viberBlock__groupBlock}>
                        <img className={s.wrapper__content__viberBlock__img2} src={group} />
                        <span className={s.wrapper__content__viberBlock__span2}>ІГРАШКИ ІЗ ЄВРОПИ</span>
                    </div>
                </a>
                <div className={s.wrapper__content__otherContacts}>
                    <a href='https://invite.viber.com/?g2=AQBKWWWUhYO3JFGddEM0fanrjg93TiGqWOjxJYr4ToGOTkkn6eLzqMKbnlgQFAN2' 
                    target="_blank"  className={s.wrapper__content__otherContacts__element1}>
                        <img src={instagram}/>
                        <span>Instagram</span>
                    </a>
                    
                    <a href='https://invite.viber.com/?g2=AQBKWWWUhYO3JFGddEM0fanrjg93TiGqWOjxJYr4ToGOTkkn6eLzqMKbnlgQFAN2' 
                    target="_blank"  className={s.wrapper__content__otherContacts__element2}>
                        <img src={tiktok}/>
                        <span>TikTok</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Contacts