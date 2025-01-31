import React from 'react';

import { Button } from '@/components/ui/button';
import { IoLogoGithub } from 'react-icons/io';
import { redirect } from 'next/navigation';
import Login_Form from '@/components/Login_Form';
import { auth, signIn } from '@/auth';

const LoginPage = async() => {
     const session = await auth()
    if (session?.user){
      redirect("/")

    }
  return (
    <div className='size-96 mx-auto p-2 flex flex-col items-center gap-3 justify-center'>
      <h1 className='text-3xl text-center'>Please Login to Continue</h1>

      <Login_Form />

      {/* GitHub Login Button */}
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}>
        <Button variant='outline' className='w-full flex items-center justify-center text-black' type='submit'>
          <IoLogoGithub className='mr-2 h-5 w-5' />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
