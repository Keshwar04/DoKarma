import { generateRandomString } from "@/helper/randomText";
import RandomAvatar from "./randomAvatar";

const Avatar = ({ isLast }: any) => {
    const randomText = generateRandomString()
    
    return (
        <div className="flex flex-col">
            {/* <div className='flex justify-center items-center 
                        bg-primaryClr  h-[48px] w-[48px] rounded-[50%]'>
                <img src={avatar} className='max-w-[48px]' />
            </div> */}
            <RandomAvatar seed={randomText} width='40'/>
            {!isLast && <div className='flex-grow mx-auto border-l'></div>}
        </div>
    )
}

export default Avatar
