import React from 'react';
import './Board.css'
import Card from './Card';

let cardCount = 0;

export default function List(props){
  return (
    <>
        <div className="board-container">
            <div className="header">
                <div className="left-header">
                    {
                        {
                            'status' : <>{
                                {
                                    'Backlog': <div className="s-icon">
                                    <img src="/svg/Backlog.svg" alt="Backlog Icon" width="22" height="22" />   {/* Ading images from the svg folder */}

                                    </div>,

                                    'Todo': <div className="s-icon">
                                    <img src="/svg/To-do.svg" alt="Backlog Icon" width="22" height="22" />
                                    </div>,

                                    'In progress': <div className="s-icon">
                                    <img src="/svg/in-progress.svg" alt="Backlog Icon" width="18" height="18" />
                                    </div>,

                                    'Done': <div className="s-icon">
                                    <img src="/svg/Done.svg" alt="Backlog Icon" width="18" height="18" />
                                    </div>,

                                    'Cancelled': <div className="s-icon">
                                    <img src="/svg/Cancelled.svg" alt="Backlog Icon" width="20" height="20" />
                                    </div>
                                }[props.listTitle]
                            } </>,
                            'user': <></>,
                            'priority' : <>{
                                {
                                    0: <div className="div8-tagicon"><img src="/svg/No-priority.svg" alt="No-priority" /></div>,
                                    1: <div className="div8-tagicon"><img src="/svg/Img - Low Priority.svg" alt="Low Priority" /></div>,
                                    2: <div className="div8-tagicon"><img src="/svg/Img - Medium Priority.svg" alt="Medium priority" /></div>,
                                    3: <div className="div8-tagicon"><img src="/svg/Img - High Priority.svg" alt="High priority" /></div>,
                                    4: <div className="div8-tagicon"><img src="/svg/SVG - Urgent Priority colour.svg" alt="Urgent priority" /></div>
                                }[props.listTitle]
                            } </>
                        }[props.groupValue]
                    }
                    
                    <div className="title"> {/*List title based on grouping criteria*/}
                        {
                            {
                                'priority' : <>{
                                                props.priorityList
                                                    ? props.priorityList.map(priorityProperty => (
                                                        priorityProperty.priority === props.listTitle
                                                        ? <>{priorityProperty.name}</>
                                                        : null
                                                    ))
                                                    : null
                                                }</>,
                                'status' : <>{props.listTitle}</>,
                                'user' : <>{props.listTitle}</>
                            }[props.groupValue]
                        }
                    </div>
                    <div className="list-sum">{cardCount}</div>
                </div>
                <div className="right-header">
                    <div className="add-item">
                        <img src="/svg/add.svg" alt="add-item" />
                    </div>
                    <div className="option-item">
                        <img src="/svg/3 dot menu.svg" alt="3 dot menu" />
                    </div>
                </div>
            </div>

            <div className="card-items">
                {
                    props.ticketDetails.map(ticket => {
                        if(ticket.status === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} />)
                        }
                        else if(ticket.priority === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} />)
                        }
                        else if(ticket.userObj.name === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} />)
                        }
                        return null
                    }, cardCount = 0)
                    
                }
            </div>

        </div>
    </>
  )
}
