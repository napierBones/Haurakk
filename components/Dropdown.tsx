import { Courses } from '@/types';

import { cn } from '@/lib/utils';
import { getAllCourses } from '@/db_serverActions';

const Dropdown = async ({ className }: { className?: string }) => {
 const { courses } = await getAllCourses();

 if (courses.length === 0) {
  return (
   <li className={cn('relative group', className)}>
    <button className='hover:underline'>Courses</button>

    <ul className='absolute top-6 left-0 bg-white text-black w-48 rounded shadow-lg p-2 hidden group-hover:block'>
     <li className='p-2 hover:bg-gray-200'>No Courses</li>
    </ul>
   </li>
  );
 }

 return (
  <li className={cn('relative group', className)}>
   <button className='hover:underline'>Courses</button>

   <ul className='absolute top-6 left-0 bg-white text-black w-48 rounded shadow-lg p-2 hidden group-hover:block max-h-36 overflow-y-auto'>
    {courses.map((course: Courses, index) => (
     <li key={index} className='p-2 hover:bg-gray-200 flex w-full items-center justify-between'>
      <span>{course.name}</span> <span> &gt;</span>
     </li>
    ))}
   </ul>
  </li>
 );
};

export default Dropdown;
