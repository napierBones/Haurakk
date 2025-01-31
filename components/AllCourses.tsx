

import React from 'react';
import { Button } from './ui/button';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { deleteCourse, getAllQueryCourses } from '@/db_serverActions';

const AllCourses = async ({search}:{search:string | string[] | undefined}) => {
 const { courses } = await getAllQueryCourses(search as string);

 return (
  <div className='border w-[80%] flex flex-col h-[300px] '>
   <h1 className='text-2xl font-bold text-center'>Courses</h1>

   <div className='overflow-x-auto w-full p-4'>
    <table className='min-w-full border-collapse border border-gray-200 '>
     <thead className=''>
      <tr className='bg-gray-100'>
       <th className='border border-gray-300 px-4 py-2 text-left'>#</th>
       <th className='border border-gray-300 px-4 py-2 text-left w-2/3'>Courses</th>
       <th className='border border-gray-300 px-4 py-2 text-left'>Actions</th>
      </tr>
     </thead>
     <tbody>
      {courses.map((item, index) => (
       <tr key={index} className=' '>
        <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
        <td className='border border-gray-300 px-4 py-2 '>
         <span>{item.name}</span> (<span className='font-bold text-xs'>category, {item.category}</span>
         <span className='font-bold text-xs'> tutor {item.trainer}</span>)
        </td>
        <td className='border border-gray-300 px-4 py-2 flex gap-2 justify-between items-center'>
         <form
          action={async () => {
            "use server"

           deleteCourse(item.id);
           revalidatePath('/courses')
       
          }}>
          <Button type='submit' className='bg-red-500 text-white px-3 py-1 hover:bg-red-600 max-w-24'>
           Delete
          </Button>
         </form>
         <Link
          href={`/?display=true&courseId=${item.id}&coursename=${item.name}&cooursecategory=${item.category}&coursetrainer=${item.trainer}`}
          className=""
         >
          <Button className='bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 rounded flex items-center justify-center  w-16  max-w-24' >Edit</Button>
          
         </Link>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default AllCourses;
