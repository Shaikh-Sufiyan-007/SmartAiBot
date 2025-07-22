import React, { createContext, useState } from 'react'

export const dataContext = createContext()

export let user = {
  data: null,
  mime_type: null,
  imgURL: null
}

export let prevUser = {
  data: null,
  mime_type: null,
  prompt: null,
  imgURL: null
}

const UserContext = ({children}) => {
    const [startRes, setStartRes] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [input, setInput] = useState("")
    const [feature, setFeature] = useState("chat")
    const [showResult, setShowResult] = useState("")
    const [prevFeature, setPrevFeature] = useState("chat")
    const [genImgURL, setGenImgURL] = useState("")

    let value = {
        startRes, setStartRes,
        popUp, setPopUp,
        input, setInput,
        feature, setFeature,
        showResult, setShowResult,
        prevFeature, setPrevFeature,
        genImgURL, setGenImgURL
    }

  return (
    <div>
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext