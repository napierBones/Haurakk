'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

import Edit_Course_Form from './Edit_Course_Form';


const Edit_Course =() => {
  
 const router = useRouter();
 const searchParams = useSearchParams();
 const display = searchParams.get('display');

 const courseId = searchParams.get('courseId');
 const courseName = searchParams.get('coursename');
 const coursecategory = searchParams.get('cooursecategory');
 const coursetrainer = searchParams.get('coursetrainer');

 const updateParam = (param: string, value: string) => {
  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set(param, value); // Update or add the parameter
  const newSearchString = currentParams.toString();
  router.push(`?${newSearchString}`);
 };

 if (display==='true') {
  return (
   <div className='fixed inset-0 z-50'>
    {/* Overlay */}
    <div className='absolute inset-0 bg-black bg-opacity-50'></div>

    {/* Edit Course Modal */}
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 p-4 border rounded bg-gray-100'>
     <div className='flex justify-between items-center'>
      <h1 className='text-lg font-bold'>Edit Course</h1>

      <IoMdClose className='cursor-pointer' color={'red'} size={30} onClick={() => updateParam('display', 'false')} />
     </div>
     <div className='w-full'>
      <Edit_Course_Form courseid={courseId} coursename={courseName} coursecategory={coursecategory} coursetrainer={coursetrainer} />
     </div>
    </div>
   </div>
  );
 }
};

export default Edit_Course;
