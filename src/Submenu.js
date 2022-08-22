import React, {useState, useEffect, useRef } from 'react';
import { useGlobalContext } from './context';
const Submenu = () => {
  const { isSubmenuOpen, location,subMenu:{page,links} } = useGlobalContext();
  const container=useRef(null)
  const [columns,setColumns]=useState("col-2")
  useEffect(()=>{
    const {center,bottom}=location //get the location of the submenu
    const submenu=container.current; //get the submenu element..through console.log(submenu.getBoundingClientRect()) you can see the location of the submenu
    submenu.style.left=`${center}px` //set the left position of the submenu
    submenu.style.top=`${bottom}px` //set the top position of the submenu
    if(links.length===3){ //if the submenu has 3 links, then set the width to be 3 columns
      setColumns("col-3")
    }if(links.length>3){
      setColumns("col-4")
    }
  },[location,links])
  return (
   <aside className={`${isSubmenuOpen?'submenu show':'submenu'}`} ref={container}>
    <section>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map((item,index)=>{
          const {icon,url,label}=item
          return (
            <a href={url} key={index}>{icon}{label}</a>
          )
        })}
      </div>
    </section>
   </aside>
  )
}

export default Submenu
