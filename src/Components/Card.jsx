import React from 'react'
import './Card.css'

export default function Card(props){
  return(
    <>
        <div className="div1">
            <div className="div2-id">
                <div className="div3-card-id">{props.cardDetails.id}</div>
                <div className="div4-profile">
                    <div className="div5-initial">{props.cardDetails.userObj.name[0]}{props.cardDetails.userObj.name[1]}</div>
                    <div className={props.cardDetails.userObj.available ?"div5-initial-available div5-initial-available-true" : "div5-initial-available"}></div>
                </div>
            </div>
            <div className="div6-title">
                {props.cardDetails.title}
            </div>
            <div className="div7-tag">
                {
                    {
                        0: <div className="div8-tagicon"><img src="/svg/No-priority.svg" alt="No-priority" /></div>,
                        1: <div className="div8-tagicon"><img src="/svg/Img - Low Priority.svg" alt="Low Priority" /></div>,
                        2: <div className="div8-tagicon"><img src="/svg/Img - Medium Priority.svg" alt="Medium priority" /></div>,
                        3: <div className="div8-tagicon"><img src="/svg/Img - High Priority.svg" alt="High priority" /></div>,
                        4: <div className="div8-tagicon"><img src="/svg/SVG - Urgent Priority grey.svg" alt="Urgent priority" /></div>
                    }[props.cardDetails.priority]
                }

                {
                    props.cardDetails.tag.map((tag) => {
                        return(
                            <div className="div9-tagbox">
                                <div className="div10-tagtitle">{tag}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}
