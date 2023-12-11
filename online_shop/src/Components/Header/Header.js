import s from './header.module.css'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Header = (props) => {
    const [navState, setNavState] = useState(props.headerState)
    return(
        <div className={s.wrapper}>
            <div className={s.headerContent}>
                <NavLink to='/'><img className={s.logoImg} src={logo} /></NavLink>
                <div className={s.navWrapper}>
                    <div onClick={()=>{setNavState('Shop')}} className={navState === 'Shop' ? s.navElementActive : s.navElement}>
                        <NavLink to='/shop'><span>МАГАЗИН</span></NavLink>
                    </div>

                    <div onClick={()=>{setNavState('Contacts')}} className={navState === 'Contacts' ? s.navElementActive : s.navElement}>
                        <NavLink to='/contacts'><span>КОНТАКТИ</span></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header