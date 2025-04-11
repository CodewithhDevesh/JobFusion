import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import { Avatar, AvatarImage } from './ui/avatar'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useNavigate } from 'react-router-dom'

// const skills = ["html", "css", "Javascript", "ReactJs"];
const isResume=true;
const Profile = () => {
    useGetAppliedJobs();
    const [open,setOpen]=useState(false);
    const {user}=useSelector(store=>store.auth);
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);
    return (
        <div>
            <Navbar />
            <div
    className={`w-full sticky top-0 z-50 transition-colors duration-300 
        ${isDark ? 'bg-[#111827]' : 'bg-white'}
    `}
>

                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>

                    </div>
                    <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>

                </div>
                <div>
                    <h1>Skills</h1>
                    <div className='flex-items-center gap-1'>
                        {
                           user?.profile?.skills.length === 0 ? <span>NA</span> :user?.profile?.skills.map((Item, index) => <Badge key={index}>{Item}</Badge>)
                        }
                    </div>

                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="text-md font-bold"> Resume</Label>
            {
                isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName} </a>:<span>NA</span>
            }
                </div>
                
            </div>
            <div   onClick={() => navigate(`/description/${job._id}`)}
            className={`p-5 rounded-md shadow-md border cursor-pointer transition-colors duration-300
                ${isDark ? 'bg-[#1f2937] border-gray-700 text-white' : 'bg-[#f9fafb] border-gray-200 text-black'}
            `}>
                      <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                      {/* Applied Job Table */}
                      <AppliedJobTable/>
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
