import React, { useContext } from 'react'
import "../App.css"
import { RiImageAiLine } from 'react-icons/ri'
import { RiImageAddLine } from 'react-icons/ri'
import { MdChatBubbleOutline } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'
import { FaArrowUpLong } from 'react-icons/fa6'
import { dataContext, prevUser, user } from '../context/UserContext'
import Chat from './Chat'
import { generateResponse } from '../gemini'
import { query } from '../huggingFace'

const Home = () => {
    let {startRes, setStartRes, popUp, setPopUp, input, setInput, feature, setFeature, showResult, setShowResult, prevFeature, setPrevFeature, genImgURL, setGenImgURL} = useContext(dataContext)

    const handleSubmit = async (e) => {
        setStartRes(true)
        setPrevFeature(feature)
        setShowResult("")
        prevUser.data = user.data
        prevUser.mime_type = user.mime_type
        prevUser.imgURL = user.imgURL
        prevUser.prompt = input
        setInput("")
        let result = await generateResponse()
        setShowResult(result)
        setFeature("chat")
        user.data = null
        user.mime_type = null
        user.imgURL = null
    }

    const handleImage = (e) => {
        setFeature("upImg")
        let file = e.target.files[0]
        
        let reader = new FileReader()
        reader.onload = (event) => {
            let base64 = event.target.result.split(",")[1]
            user.data = base64
            user.mime_type = file.type
            user.imgURL = `data:${user.mime_type};base64,${user.data}`
        }
        reader.readAsDataURL(file)
    }

    const handleGenerateImg = async () => {
        setStartRes(true)
        setPrevFeature(feature)
        setGenImgURL("")
        prevUser.prompt = input
        let result = await query().then((e) => {
            let url = URL.createObjectURL(e)            
            setGenImgURL(url)
        })
        setInput("")
        setFeature("chat")
    }
  return (
    <div className='home'>
        <nav>
            <div className="logo" onClick={() => {
                setStartRes(false)
                setFeature("chat")
            }}>
                Smart AI Bot
            </div>
        </nav>

        <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage} />

        {!startRes ? 
            <div className="hero">
            <span id='tag'>What can i help with ?</span>
            <div className="cate">
                <div className="upImg" onClick={() => {
                    document.getElementById("inputImg").click()
                }}>
                    <RiImageAddLine />
                    <span>Upload Image</span>
                </div>
                <div className="genImg" onClick={() => setFeature("genImg")}>
                    <RiImageAiLine />
                    <span>Generate Image</span>
                </div>
                <div className="chat" onClick={() => setFeature("chat")}>
                    <MdChatBubbleOutline />
                    <span>Let's Chat</span>
                </div>
                </div>
            </div>
            :
            <Chat />
        }
        

        <form className="input-box" onSubmit={(e) => {
            e.preventDefault()
            if(input) {
                if(feature == "genImg") {
                    handleGenerateImg(e)
                } else {
                    handleSubmit(e)
                }
            }
            }}>
            {
                popUp ? 

            <div className="pop-up">
                    <div className="select-up" onClick={() => {
                        setPopUp(false)
                        document.getElementById("inputImg").click()
                    }}>
                    <RiImageAddLine />
                    <span>Upload Image</span>
                </div>
                <div className="select-gen" onClick={() => {
                        setPopUp(false)
                        setFeature("genImg")
                    }}>
                    <RiImageAiLine />
                    <span>Generate Image</span>
                </div>
            </div>
            :
            null
            }

            <div id='add' onClick={() => {
                setPopUp(prev => !prev)
            }}>
                {feature == "genImg" ? <RiImageAiLine id='genImg' /> : <FiPlus />}
                
            </div>

            <input type="text" placeholder='Ask something...' onChange={(e) => (setInput(e.target.value))} value={input}/>

            {input ?
                <button id='submit'>
                    <FaArrowUpLong />
                </button>
            : null
            }
        </form>
    </div>
  )
}

export default Home