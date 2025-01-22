/**
 * CreatePassword Component
 * 
 * This component allows users to create a new password.
 * It includes password and confirm password fields with show/hide functionality.
 * 
 * Features:
 * - Password input with toggle visibility
 * - Confirm password input with toggle visibility
 * - Real-time validation
 * - Error messaging for invalid inputs
 * - Toast notification on successful password change
 * - Navigation to login page after successful password creation
 * 
 * The component uses various UI components from the project's UI library,
 * including Label, Button, and Input. It also utilizes the toast notification
 * system for user feedback.
 * 
 * State management is handled using React's useState hook, and navigation
 * is managed with react-router-dom's useNavigate hook.
 */

import { useState } from 'react'
import Layout from './layout'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { createPwdValidation } from '@/logics/validation'
import { toast } from "../../hooks/use-toast"

const CreatePassword = () => {
    const [userPwd, setUserPwd] = useState<any>({})
    const [pwdShow, setPwdShow] = useState({ temp: false, cnfrm: false })
    const [errMsg, setErrMsg] = useState<any>({})
    const navigate = useNavigate()

    const pwdClass = 'absolute right-4 top-3 cursor-pointer'
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserPwd({ ...userPwd, [name]: value })
    }

    const handleClick = () => {
        const errData = createPwdValidation(userPwd)
        setErrMsg(errData)
        if (Object.keys(errData).length === 0) {
            toast({
                title: `Password Changed Successfully`,
                description: 'You can now Login with New Password'
            })
            navigate('/login')
        }
    }
    return (
        <Layout>
            <Label className="block text-formColor text-xl text-center font-semibold mb-2">
                Create New Password
            </Label>
            <div>
                <Label>Password</Label>
                <div className="relative">
                    <Input type={!pwdShow.temp ? 'password' : 'text'} className="mt-2"
                        onChange={handleChange} name="temp" value={userPwd.temp || ''} />
                    {!pwdShow.temp ?
                        <EyeOff size='16' color="#3064A2" className={pwdClass} onClick={() =>
                            setPwdShow({ ...pwdShow, temp: !pwdShow.temp })} />
                        :
                        <Eye size='16' color="#3064A2" className={pwdClass}
                            onClick={() => setPwdShow({ ...pwdShow, temp: !pwdShow.temp })} />
                    }
                </div>
                <Label className="text-[11px] h-[16px] block text-red-500 mt-1">{errMsg.temp}</Label>
            </div>
            <div className='my-5'>
                <Label>Confirm Password</Label>
                <div className="relative">
                    <Input type={!pwdShow.cnfrm ? 'password' : 'text'} className="mt-2"
                        onChange={handleChange} name="cnfrm" value={userPwd.cnfrm || ''} />
                    {!pwdShow.cnfrm ?
                        <EyeOff size='16' color="#3064A2" className={pwdClass} onClick={() =>
                            setPwdShow({ ...pwdShow, cnfrm: !pwdShow.cnfrm })} />
                        :
                        <Eye size='16' color="#3064A2" className={pwdClass}
                            onClick={() => setPwdShow({ ...pwdShow, cnfrm: !pwdShow.cnfrm })} />
                    }
                </div>
                <Label className="text-[11px] h-[16px] block text-red-500 mt-1">{errMsg.cnfrm}</Label>
            </div>
            <Button className='bg-formColor hover:bg-[#1F4473] w-full mt-2'
                onClick={handleClick}>
                Submit
            </Button>
        </Layout>
    )
}

export default CreatePassword
