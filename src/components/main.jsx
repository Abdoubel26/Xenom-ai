import { useContext } from "react";
import { assets } from "../assets/assets";
import { Context } from "..//context/context"

function Main() {

    const {onSent, recentPrompt, setRecentPrompt , showResult, loading, ResultData, setInput, input } = useContext(Context)

    return (
    
    
    <div className="w-full flex flex-col justify-between ">
        
        <div className="flex justify-between">
            <p className="text-2xl p-3">Gemini</p>
            <img  className='rounded-full w-12 h-12 mx-3 mt-1 cursor-pointer' src={assets.user_icon} alt="Profile Picture" />
        </div>

        {
        !showResult
        ?
        <>
        <div className="flex flex-col items-center sm:justify-between sm:h-[65%]">

            <div className="p-2 mb-6">
                <p className="bg-gradient-to-r text-6xl sm:text-7xl from-blue-500 to-red-600 bg-clip-text text-transparent font-semibold">Hello, Dev.</p>
                <p className=" font-semibold sm:text-7xl text-5xl text-gray-300"> How can I help you today?</p>
            </div>

            <div className="sm:flex grid grid-cols-2 mx-4 gap-2">

                <div onClick={() => {
                     onSent("Suggest Beautiful places to see on an upcoming road trip")} } className="bg-gray-200 p-3 rounded-xl flex flex-col justify-between  text-gray-700 cursor-pointer  h-40 w-50 transition-all hover:bg-gray-300" >
                    <p>Suggest Beautiful places to see on an upcoming road trip</p>
                    <img className='h-10 w-10 p-1.5  bg-gray-50 rounded-full self-end' src={assets.compass_icon} alt="" />
                </div>

                <div onClick={() => {
                     onSent("Briefly summurize this concept: urban planning")} } className="bg-gray-200 p-3 rounded-xl flex flex-col justify-between  text-gray-700 cursor-pointer  h-40 w-50  transition-all hover:bg-gray-300" >
                    <p>Briefly summurize this concept: urban planning</p>
                    <img className='h-10 w-10 p-1.5  bg-gray-50 rounded-full self-end' src={assets.bulb_icon} alt="" />
                </div>

                <div onClick={() => {
                     onSent("Brainstorm team bonding activities for our work retreat")} } className="bg-gray-200 p-3 rounded-xl flex flex-col justify-between  text-gray-700 cursor-pointer  h-40 w-50  transition-all hover:bg-gray-300" >
                    <p>Brainstorm team bonding activities for our work retreat</p> 
                    <img  className='h-10 w-10 p-1.5  bg-gray-50 rounded-full self-end' src={assets.message_icon} alt="" />  
                </div>

                <div onClick={() => {
                     onSent("Improve the readability of the following code")} } className="bg-gray-200 p-3 rounded-xl flex flex-col justify-between  text-gray-700 cursor-pointer  h-40 w-50 transition-all hover:bg-gray-300" >
                    <p>Improve the readability of the following code</p>
                    <img className='h-10 w-10 p-1.5  bg-gray-50 rounded-full self-end' src={assets.code_icon} alt="" />
                </div>

            </div>
        </div> 
        </>
        :  

        <div className="p-5 outfit overflow-y-scroll max-h-[70vh] px-[5%] no-scrollbar">
            <div className="flex mb-7">
                <img className=" rounded-full h-13" src={assets.user_icon} alt="" />
                <div className="items-center flex w-fit my-2 mx-1 p-2 bg-gray-200 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl ">
                  <p className="">{recentPrompt}</p>  
                </div>
            </div>

            <div className="flex justify-center">
                <img className='h-10' src={assets.gemini_icon} alt="" />
                <div className="flex w-full items-center expectional">
                    {loading ? 
                    <div className="w-[100%] flex flex-col gap-[10px]">
                       <div className="loader-animation rounded-xl bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] h-[20px]" style={{ backgroundSize: '800px 50px' }}></div>
                       <div className="loader-animation rounded-xl bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] h-[20px]" style={{ backgroundSize: '800px 50px' }}></div>
                       <div className="loader-animation rounded-xl bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] h-[20px]" style={{ backgroundSize: '800px 50px' }}></div>
                    </div>
                    : 
                    <p className="text-[17px] font-normal" dangerouslySetInnerHTML={{__html:ResultData}}></p> }
                    
                </div>
                
            </div>
        </div>        

        }
 

        <div className={`w-full flex flex-col ${!showResult ? 'mb-8' : 'mt-5 mb-9'}   items-center `}>
            <div className="sm:w-[70%] w-[90%] mt-2 sm:mt-0 bg-blue-50  text-xl rounded-full mx-3 flex">
                <input type="text" onChange={(e)=> setInput(e.target.value)} value={input} className="w-[100%] bg-blue-50 py-4  text-xl p-2 rounded-full pl-4 mx-3 focus:outline-none" placeholder="Enter a prompt here" />
                <img  className='h-6  mr-2 mt-5 cursor-pointer' src={assets.gallery_icon}></img>
                <img className={`h-6 mt-5 cursor-pointer ${input !== '' ? 'mr-0' : 'mr-3'}`} src={assets.mic_icon} alt="" />
                {input !== '' ? <img onClick={() => onSent()} className="mr-3 h-10 mt-3 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-all active:bg-gray-300" src={assets.send_icon}></img> : null}
            </div>
            
        </div>

        <div>
            <p className="text-sm text-center sm:-mt-9 sm:mb-1 -mt-8 py-1 mx-1 ">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
    </div>


     );
}

export default Main;