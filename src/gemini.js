import { prevUser } from "./context/UserContext"

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCS2WeKpKrgTA1FnV7Su8wE21smeXXD58w"

export async function generateResponse(params) {
    let RequestOption = {
        method: "POST",
        Headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          "contents": [{
              "parts":[
                {"text": prevUser.prompt},
                prevUser.data ? [
                    {
                      "inline_data": {
                        "mime_type": prevUser.mime_type,
                        "data": prevUser.data
                      }
                    }
                ] : []
              ]
            }]
        })
    }

    try{
        let res = await fetch(API_URL, RequestOption)
        let data = await res.json()
        let apiRes = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        return apiRes
    } catch(err) {
        console.log(err)
    }
}