import React, { useContext } from 'react'
import { dataContext, prevUser } from '../context/UserContext'

const Chat = () => {
  const {input, setInput, showResult, setShowResult, feature, setFeature, prevFeature, setPrevFeature, genImgURL, setGenImgURL} = useContext(dataContext)
  return (
    <div className='chat-page'>
      <div className='user'>
        {prevFeature == "upImg" ? 
        <>
          <img src={prevUser.imgURL} alt="" />
          <span>{prevUser.prompt}</span>
        </>

        : <span>{prevUser.prompt}</span>
        }
      </div>

      <div className="ai">
      {prevFeature == "genImg" 
        ? 
        <>
          { !genImgURL ? <span>Generating Image...</span> : <img src={genImgURL} alt="" /> }
        </>    
        :
          !showResult
          ?
          <span>Loading...</span>
          :
          <span>{showResult}</span>
          }
      </div>
    </div>
  )
}

export default Chat