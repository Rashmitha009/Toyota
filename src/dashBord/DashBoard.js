import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import { Outlet } from "react-router-dom"


const DashBoard = () => {
 
  return (
    <div className='dashboard'>
      <Navbar className='navbar'/>   
        <div style={{
          display: 'inline-flex',
          width: '100%'
        
        }}>
      <Sidebar className='sidebar'/> 
        <div style={{height:'100vh', width:'100%', overflow:'auto',background:'white'}}>
        <Outlet/>
        </div>  
      </div>  
    </div>
  )
}

export default DashBoard