import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from './context'
import sublinks from './data'
const Sidebar = () => {
  const { isSidebarOpen,closeSidebar} = useGlobalContext()
  return (
    <div className={`${isSidebarOpen?"sidebar-wrapper show":"sidebar-wrapper"}`}>
      <aside className='sidebar'>
        <button className="close-btn" onClick={closeSidebar}><FaTimes/></button> {/*close the sidebar when cursor is outside of menu*/}
        <div className="sidebar-links">
          {sublinks.map((item,index)=>{
            const {links,page} = item
            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className="sidebar-sublinks">
                  {links.map((link,index)=>{
                    const{label,icon,url}=link;
                    return (
                      <a href={url} key={index}>{icon}{label}</a>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
