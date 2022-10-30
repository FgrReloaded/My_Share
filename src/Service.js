import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import useChat from "./useChat";
function Service() {
  const choose = useRef();
  const params = useParams();
  const [translate, setTranslate] = useState("hidden")
  const [translate2, setTranslate2] = useState("hidden")
  const { room } = params;

  const { messages, sendMessage, shareFile, files } = useChat(room);
  const [newMessage, setNewMessage] = useState("");

  const chooseFile = () => {
    choose.current.click();
  }
  const handleSend = () => {
    sendMessage(newMessage);
    setNewMessage("");
  }
  const handleFileUpload = async (e) => {
    const fileData = {
      filename: e.target.files[0].name
    };
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append("upload_preset", "myshare");
    formData.append("cloud_name", "devmdawne");
    fetch("https://api.cloudinary.com/v1_1/devmdawne/image/upload", {
      method: "post",
      body: formData
    })
      .then(resp => resp.json())
      .then(data => {
        shareFile(data.secure_url, fileData);
      })
      .catch(err => console.log(err))
  }
  function downloadFile(url, fileName) {
    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  };
  return (
    <>
      <div className="sContainer w-full bg-gray-100">
        <div className="box shadow-sm">
          <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4">
            <div className="flex-row gap-4 flex justify-center items-center">
              <button onClick={() => { setTranslate2("") }} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Send
              </button>
              <div className=" flex flex-col">
                <span className="text-gray-600 dark:text-white text-lg font-medium">
                  Files
                </span>
              </div>
              <div className="flex-shrink-0">
                <div className="block relative">
                  <img src="/images/file.png" alt='file' width={48} />
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4">
            <div className="flex-row gap-4 flex justify-center items-center">
              <div className="flex-shrink-0">
                <div className="block relative">
                  <img src="/images/note.png" alt='note' width={48} />
                </div>
              </div>
              <div className=" flex flex-col">
                <span className="text-gray-600 dark:text-white text-lg font-medium">
                  Text
                </span>
              </div>
              <button onClick={() => { setTranslate("") }} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className={`rCorner h-full md:h-screen w-3/4 md:w-2/5 transition-all ${translate} shadow-lg`}>
        <span className='ml-4 cursor-pointer' onClick={() => { setTranslate("hidden") }}>X</span>
        <div className="msgBody">
          {messages.map((message, i) => (
              <div key={i} className="inline-flex ml-5 mt-5 items-center bg-white leading-none rounded-full p-2 shadow text-teal text-sm">
                <span onClick={()=>{navigator.clipboard.writeText(message.body);}} className={`cursor-pointer inline-flex ${message.ownedByCurrentUser?"bg-pink-600":"bg-gray-700"} text-white rounded-full h-6 px-3 justify-center items-center`}>
                  {message.ownedByCurrentUser?"Me":"Copy"}
                </span>
                <span className={`inline-flex px-2 ${message.ownedByCurrentUser?"text-pink-600":"text-gray-700"}`}>
                  {message.body}
                </span>
              </div>
          ))}
        </div>
        <div className="inpField">
          <form>
            <label htmlFor="text" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
            <div className="relative">
              <input onChange={(e) => { setNewMessage(e.target.value); }} value={newMessage} type="text" id="text" className="block p-4 pl-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type..." required />
              <button onClick={handleSend} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`lCorner h-full md:h-screen w-3/4 md:w-2/5 transition-all ${translate2} shadow-lg`}>
        <span className='mr-4 float-right cursor-pointer' onClick={() => { setTranslate2("hidden") }}>X</span>
        <div className="fileBody mt-6">
          {files.map((data, index) => {
            return <div key={index} className='my-2'>
              <div className={`bg-white flex justify-between items-center rounded-lg ${data.ownedByCurrentUser ? "w-full" : "md:w-3/4 w-full"} shadow p-4 m-auto`}>
                <img className='shadow-lg' src={data.url} width={100} alt="" />
                <div className={`w-full relative rounded-full  ${data.ownedByCurrentUser ? "hidden" : ""}`}>
                  <button onClick={() => { downloadFile(data.url, data.filedata.filename) }} className="flex items-center p-2 m-auto transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
                    <svg width="20" className='rotate-180' height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          })}
        </div>

        <div className="inpField">
          <form>
            <label className="block">
              <span className="sr-only">Choose File</span>
              <button onClick={chooseFile} type="button" className="py-2 px-2 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                <svg width="20" height="20" className="mr-2" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                  </path>
                </svg>
                Choose
              </button>
              <input ref={choose} onChange={handleFileUpload} type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </label>
          </form>
        </div>
      </div>
    </>
  )
}

export default Service