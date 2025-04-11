
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AppliedJobTable=()=> {
    const {allAppliedJobs}=useSelector(store=>store.job);
   // console.log("printing chalu: ",allAppliedJobs);
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
        <div
        onClick={() => navigate(`/description/${job._id}`)}
        className={`p-5 rounded-md shadow-md border cursor-pointer transition-colors duration-300
            ${isDark ? 'bg-[#1f2937] border-gray-700 text-white' : 'bg-[#f9fafb] border-gray-200 text-black'}
        `}
    >
            <Table>
                <TableCaption>A list of your applied jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
               <TableBody>
                 {
                    allAppliedJobs?.length <=0 ?<span>You haven't applied any job yet.</span> : allAppliedJobs?.map((appliedJob)=>(
                        <TableRow key={appliedJob?._id}>
                            <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob.job?.title}</TableCell>
                            <TableCell>{appliedJob.job?.company?.name}</TableCell>
                            <TableCell className={"text-right"}><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' :appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                 }
               </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
