import React from 'react'

export default function MessageBar({messages}) {
  return (
    <div className='message-section'>
        <div className='msg-body'>
            <h2 className='msg-head'>Status Quo</h2>
            <ul className='msg-list'>
                {messages.map((item) => {
                    return(
                        <li>
                            {item}
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  )
}
