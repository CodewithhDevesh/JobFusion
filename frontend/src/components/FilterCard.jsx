import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
const filterData = [
    {
        filterType:"Location",
        array: ["Delhi NCR","Banglore","Hyderabad", "Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array: ["Frontend Developer","Backend Developer","Fullstack Developer"]
    },
    {
        filterType:"Salary",
        array: ["0-40K","42K-1lakh","1lakh-to 5lakh"]
    },
]
export default function FilterCard() {
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
    const [selectedValue,setSelectedValue]=useState('');
    const dispatch =useDispatch();
    const changeHandler =(value)=>{
        setSelectedValue(value);
    }
    useEffect(()=>{
  dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
  return (
    <div
            onClick={() => navigate(`/description/${job._id}`)}
            className={`p-5 rounded-md shadow-md border cursor-pointer transition-colors duration-300
                ${isDark ? 'bg-[#1f2937] border-gray-700 text-white' : 'bg-[#f9fafb] border-gray-200 text-black'}
            `}
        >
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                
                filterData.map((data,index) =>(
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item,idx) =>{
                              const itemId=`r${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}