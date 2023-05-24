import React from 'react'
import Message from '../message/message'



function History({historyList}) {
  return (
    <div>
        { // return(<Message/>)        
                historyList.map((element,index) => {
                    return (<Message key={index} text={element.text} sender = {element.sender} />)
                })
        }
        
    </div>
  )
}

export default History