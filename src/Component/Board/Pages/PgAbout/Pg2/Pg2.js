import React, {Fragment, useEffect, useState} from 'react'
import css from './Pg2.module.css'
import { v4 as uuidv4 } from 'uuid';

const Pg2 = (props) => {

    const [ Pg2show, setPg2show ] = useState(false)

    useEffect(() => {
      setTimeout(() => {
        setPg2show(true)
      }, 0)
    },[])
  
    
    let Page2Style = [css.page2, css.pg2_hide].join(' ')
    if(Pg2show) { Page2Style = [css.page2].join(' ')}

    let contentStyle = [css.container, css.container_hide].join(' ')
    if(!props.IsPg1Show) {
      contentStyle = [css.container]
    }

    const items = [{

      title: ``,
      paras: [{
        p: `Culpa cum aspernatur dignissimos ducimus, facere quaerat adipisci aut dolorem, ea quis illo. Voluptate odit officia iure natus. Ullam laboriosam perferendis quam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates excepturi hic eligendi officiis recusandae mollitia perspiciatis, praesentium nihil!`
      }]

    }, {

      title: `We Care About Your Privacy`,
      paras: [{
        p: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates excepturi hic eligendi officiis recusandae mollitia perspiciatis, praesentium nihil. At praesentium voluptatibus excepturi aliquid ea a beatae unde cum explicabo corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum aspernatur dignissimos ducimus, facere quaerat adipisci aut dolorem, ea quis illo. Voluptate odit officia iure natus. Ullam laboriosam perferendis quam.Lorem ipsum, dolor sit amet consectetur adipisicing elit.`
      }]

    }, {

      title: `Our Vision`,
      paras: [{
        p: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates excepturi hic eligendi officiis recusandae mollitia perspiciatis, praesentium nihil. At praesentium voluptatibus excepturi aliquid ea a beatae unde cum explicabo corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit.`
      }]

    }]

    const itemsMap = items.map((item) => {
      const title = <h4 key={item.title + uuidv4()}>{item.title}</h4>
      const para = item.paras.map((p => {
        return <p key={item.title + uuidv4()}>{p.p}</p>
      }))

      return <Fragment key={item.title + uuidv4()}>
        {title}
        {para}
      </Fragment>
    })

    const address = [{
      line: ` Lot 10669 Jalan Conlay Lama,`
    }, {
      line: `50450 Kuala Lumpur, Malaysia`
    }]

    const addressMap = address.map(item => {
      return <Fragment key={item.title + uuidv4()}>{item.line}<br/></Fragment>
    })


    const contacts = [{
      line: `Tel: + 603 1223 1888`
    }, {
      line: `Fax: +603 1223 1999`
    }, {
      line: `E-mail: sevices@jourvy.com`
    }]

    const contactsMap = contacts.map(item => {
      return <Fragment key={item.title + uuidv4()}>{item.line}<br/></Fragment>
    })

    return (
        <div className={Page2Style}>
          <div className={contentStyle}>
            <h1 className={css.pg2_title}>Why Jourvy</h1>
            <div className={css.pg2_content}>
              {itemsMap}

              <div className={css.contact}>
                <h4>Contact US</h4>
                <p>{addressMap}</p>
                <p>{contactsMap}</p>
                <p>Copyright © 2020 Jourvy. All rights reserved</p>
                <p style={{"fontSize": "1.2rem"}}>None of this is real. You can't contact us.</p>
              </div>

            </div>
          </div>
        </div>
    )
}

export default Pg2
