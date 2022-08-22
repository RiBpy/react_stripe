import React, { useContext, useState } from 'react'
import sublinks from './data'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const[isSidebarOpen, setIsSidebarOpen] = useState(false)
    const[isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const [location, setLocation] = useState({})
    const [subMenu, setSubMenu] = useState({page:'',links:[]})
    const [isLoggedIn,setIsLoggedIn]=useState({})
    const openSidebar = () => setIsSidebarOpen(true)
    const closeSidebar = () => setIsSidebarOpen(false)
    const openSubmenu = (text,coordinates) => {
        //console.log(coordinates);
        const page=sublinks.find(item=>item.page===text) //find the page from sublinks which has the same name as the nav text
       // console.log(page);
        setSubMenu(page)
        setLocation(coordinates) //set the location of the submenu
        setIsSubmenuOpen(true)
    }
    const closeSubmenu = () => setIsSubmenuOpen(false)
    return <AppContext.Provider value={
        {
            isSidebarOpen,
            isSubmenuOpen,
            openSidebar,
            closeSidebar,
            openSubmenu,
            closeSubmenu,
            location,
            subMenu,
            isLoggedIn,
            setIsLoggedIn
        }
    }>{children}</AppContext.Provider>
}
export const useGlobalContext = () => useContext(AppContext)
export { AppProvider, AppContext }

