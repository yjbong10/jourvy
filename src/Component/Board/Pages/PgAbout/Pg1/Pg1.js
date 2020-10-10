import React, { useState, useEffect } from 'react'
import css from './Pg1.module.css'
import NextButton from '../../../../UI/NextButton/NextButton'

const Pg1 = (props) => {

    const [show, setShow] = useState(false)
    const [ Pg1show, setPg1show ] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {
          setPg1show(true)
        }, 900)
    })

    let Page1Style = [css.page1, css.shadow, css.pg1_hide].join(' ')
    if(Pg1show) { Page1Style = [css.page1, css.shadow].join(' ')}
    
    let BtnStyle = [css.Btn_fixed]
    let ContainerStyle = [css.container]
    if (show) {
        Page1Style = [css.page1, css.shadow, css.collapse].join(' ')
        BtnStyle = [css.Btn_fixed, css.Btn_rotate]
        ContainerStyle = [css.container, css.container_collapse].join(' ')
    }

    function btnOnClick() {
      props.setIsPG1Show(prev => !prev)
      setShow(!show)
    }

    return (
        <div className={Page1Style}>
          <div className={css.Btn_positon}>
            <div className={BtnStyle.join(' ')}>
              <NextButton clicked={btnOnClick} />
            </div>
          </div>
            <div className={ContainerStyle}>
                <h1 className={css.pg1_title}>About Jornvy</h1>
                <p className={css.pg1_content}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates excepturi hic eligendi officiis recusandae mollitia perspiciatis, praesentium nihil. At praesentium voluptatibus excepturi aliquid ea a beatae unde cum explicabo corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum aspernatur dignissimos ducimus, facere quaerat adipisci aut dolorem, ea quis illo. Voluptate odit officia iure natus. Ullam laboriosam perferendis quam.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates excepturi hic eligendi officiis recusandae mollitia perspiciatis, praesentium nihil. At praesentium voluptatibus excepturi aliquid ea a beatae unde cum explicabo corporis!</p>
            </div>
        </div>
    )
}

export default Pg1
