'use client';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const Search = ({ className }: { className?: string }) => {
 const router = useRouter();
 const searchParams = useSearchParams();


 const updateParam = (param: string, value: string) => {
  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set(param, value); // Update or add the parameter
  const newSearchString = currentParams.toString();
  router.push(`?${newSearchString}`);
 };

 return (
  <li className={cn('relative min-w-40 p-3 ring-1 ring-gray-300 rounded-full flex-1 flex items-center', className)}>
   <CiSearch size={10} className='absolute left-3' />
   <input
    type='text'
    className=' text-xs w-full focus:outline-none placeholder:text-xs ml-5'
    placeholder='search for categories, courses or training providers'
    onChange={(e) => updateParam('query', e.target.value)}
   />
  </li>
 );
};

export default Search;
