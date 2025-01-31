import React from 'react';
import Dropdown from './Dropdown';
import Search from './Search';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import { Button } from './ui/button';
import { auth, signOut } from '@/auth';
import { IoMenuSharp } from 'react-icons/io5';
const Navbar = async () => {
 const session = await auth();

 if (!session?.user) return null;
 return (
  <header className='text-gray-800 bg-white p-2 border mb-5 flex gap-1 items-center'>
   <div className='text-3xl text-blue-500 font-bold'>Hurak</div>
   <ul className=' items-center text-lg justify-between px-1 gap-2 w-full relative hidden md:flex'>
    <Dropdown />
    <li className='hover:underline'>
     <Link href='/'>Liscense</Link>
    </li>
    <li className='hover:underline'>
     <Link href='/'>Locations</Link>
    </li>
    <Search />
    <li className='hover:underline'>
     <Link href='/'>Blog</Link>
    </li>
    <li className='hover:underline'>
     <Link href='/'>Test Prep</Link>
    </li>
    <li className=''>
     <Link href='/'>
      <CiShoppingCart size={25} />
     </Link>
    </li>
    {session?.user ? (
     <li className='hover:underline'>
      <form
       action={async () => {
        'use server';
        await signOut();
       }}>
       <Button type='submit' className='bg-red-400 text-white px-2 py-1 rounded min-w-24'>
        Logout
       </Button>
      </form>
     </li>
    ) : (
     <li className='hover:underline'>
      <Link href='/login'>
       <Button className='bg-emerald-600 text-white px-2 py-1 min-w-24 rounded'>Login</Button>
      </Link>
     </li>
    )}
   </ul>
   {/* dropdownmenu */}
   <Search className='md:hidden' />
   <ul>
    <Dropdown className='md:hidden' />
   </ul>
   <div className='relative group flex flex-col items-center md:hidden min-w-36 '>
    <button className=''>
     <IoMenuSharp size={40} />
    </button>
    <ul className='absolute top-10 left-0  text-lg justify-between gap-2 w-full  flex-col hidden group-hover:flex  overflow-y-auto bg-white p-5 border'>
     <li className='hover:underline'>
      <Link href='/'>Liscense</Link>
     </li>
     <li className='hover:underline'>
      <Link href='/'>Locations</Link>
     </li>

     <li className='hover:underline'>
      <Link href='/'>Blog</Link>
     </li>
     <li className='hover:underline'>
      <Link href='/'>Test Prep</Link>
     </li>
     <li className=''>
      <Link href='/'>
       <CiShoppingCart size={25} />
      </Link>
     </li>
     {session?.user ? (
      <li className='hover:underline'>
       <form
        action={async () => {
         'use server';
         await signOut();
        }}>
        <Button type='submit' className='bg-red-400 text-white px-2 py-1 rounded min-w-24'>
         Logout
        </Button>
       </form>
      </li>
     ) : (
      <li className='hover:underline'>
       <Link href='/login'>
        <Button className='bg-emerald-600 text-white px-2 py-1 min-w-24 rounded'>Login</Button>
       </Link>
      </li>
     )}
    </ul>
   </div>
  </header>
 );
};

export default Navbar;
