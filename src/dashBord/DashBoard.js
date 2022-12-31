import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"
import { Outlet } from "react-router-dom"


const DashBoard = () => {
 
  return (
    <div>
      <Navbar style={{
        height: '6vh',width:'100%'
      }} className='navbar'/>
      <div style={{
        display: 'inline-flex',
        width: '100%',
        height:'94vh'
      }}>
        <Sidebar className='sidebar'/> 
        <div style={{height:'94vh', width:'94vw', overflow:'auto',background:'white'}}>
          <Outlet/>
        </div>  
    </div>  
    </div>
  )
}

export default DashBoard