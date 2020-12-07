import React, { useState } from 'react';
import Navbar from './nav/Navbar';
import SideMenu from './nav/SideMenu';

export default function Navigation({ setBackground }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <SideMenu open={open} setOpen={setOpen} setBackground={setBackground} />
    </div>
  )
}
