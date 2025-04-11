import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
   const navigate1 = useNavigate();
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
   
        
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className={`p-5 rounded-md shadow-md border cursor-pointer transition-colors duration-300
                ${isDark ? 'bg-[#1f2937] border-gray-700 text-white' : 'bg-[#f9fafb] border-gray-200 text-black'}
            `}
        >
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden border" variant="outline" size="icon">
                    <Avatar className="w-full h-full">
                        <AvatarImage src={job?.company?.logo} className="w-full h-full object-contain" />
                    </Avatar>
                </Button>

                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-medium text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-500'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant={"ghost"}>{job?._position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={"ghost"}>{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant={"ghost"}>{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job
