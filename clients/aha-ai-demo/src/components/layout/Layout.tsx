import React from 'react';
import {Toaster} from 'react-hot-toast';
import {NavBar} from './NavBar';

type Props = {
  children: React.ReactNode;
};

function Layout({children}: Props) {
  return (
    <>
      <div>
        <NavBar />
        <main style={{padding: '1em'}}>{children}</main>
        <Toaster />
      </div>
    </>
  );
}

export {Layout};
