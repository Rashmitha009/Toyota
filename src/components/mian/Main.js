import React, { useEffect, useState } from "react";
import "./Main.css";
import SettingsIcon from '@mui/icons-material/Settings';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HandymanIcon from '@mui/icons-material/Handyman';
import BuildIcon from '@mui/icons-material/Build';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Battery50Icon from '@mui/icons-material/Battery50';
import DangerousIcon from '@mui/icons-material/Dangerous';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import img from "./rdl.png"
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StyleIcon from '@mui/icons-material/Style';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import {
        FetchCountService, 
 
} from "../../services/ApiServices";
import ApplicationStore from '../../utils/ApplicationStore';
const Main = () => {
    const [assetCount, setAssetCount]= useState('');
    const [tagAssets,setTagAssets]= useState('');
    const [untagCount,setUntagCount]= useState('');
    const [ warrantyDueCount ,setWarrantyDueCount]= useState('');
    const [amcDueCount,setAmcDueCount]= useState('');
    const [ certificateDueCount, setCertificateDueCount]= useState('');
    const [ insuranceDueCount, setInsuranceDueCount]= useState('');
    const [auditDueCount,setAuditDueCount]= useState('');
    const [eolCount,setEolCount]= useState('');
    const [damageCount,setDamageCount]= useState('');
    const [salesCount,setSalesCount]= useState('');
    const [inServiceCount,setInServiceCount]=useState('');
    const [scrapCount,setScrapCount]=useState('');
    const [transferCount,setTransferCount]=useState('');
    const [serviceeDueCount,setServiceeDueCount]=useState('');
    const [inspectionDueCount,setInspectionDueCount]=useState('');
    const [transferDueCount,setTransferDueCount]=useState('');
    const [notFound,setNotfound]=useState('');
    const [notInuseCount,setNotInuseCount]=useState('');
    const [newAssetCount,setNewAssetCount]=useState('');

    const [user ,setUser]=useState(false);
    const [dateTime, setDateTime] = useState({
        time: '',
        date: '',
      });
    
    useEffect(()=>{
        FetchCountService(handleAssetsCountService,handleAssetsCountException);
        const {userDetails} = ApplicationStore().getStorage("userDetails");
        const {userRole} =userDetails;
        if(userRole ==='Admin')
        {
         setUser(true);
        }

        setInterval(() => {
            const currentTime = new Date();
            setDateTime(() => {
              return {
                time: currentTime.toLocaleTimeString('en', {
                  hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric',
                }),
                date: currentTime.toLocaleDateString('es-CL')
              };
            });
          });
    },[]);

    const handleAssetsCountService = (dataObject) => {
        setAssetCount(dataObject?.assetsCount|| 0);
        setTagAssets(dataObject?.tagAssetsCount || 0);
        setUntagCount(dataObject?.untagCount || 0);
        setWarrantyDueCount(dataObject?.warrantyDueCount || 0);
        setAmcDueCount(dataObject?.amcDueCount|| 0);
        setCertificateDueCount(dataObject?.certificateDueCount || 0);
        setInsuranceDueCount(dataObject?.inServiceCount || 0);
        setAuditDueCount(dataObject?.auditDueCount || 0);
        setEolCount(dataObject?.eolCount || 0);
        setDamageCount(dataObject?.damageCount || 0);
        setSalesCount(dataObject?.salesCount || 0);
        setInServiceCount(dataObject?.insuranceDueCount || 0);
        setScrapCount(dataObject?.scrapCount || 0);
        setServiceeDueCount(dataObject?.serviceeDueCount || 0);
        setInspectionDueCount(dataObject?.inspectionDueCount || 0);
        setTransferDueCount(dataObject?.transferDueCount || 0);
        setNotfound(dataObject?.notFoundCount || 0);
        setNotInuseCount(dataObject?.notInuseCount || 0 );
        setDamageCount(dataObject?.damageCount || 0);
        setTransferCount(dataObject?.transferCount || 0);
        setNewAssetCount(dataObject?.newAssetCount || 0);
    }

    const handleAssetsCountException=()=>{  
      
    }

    const handleTransferCountService=(dataObject)=>{
        setTransferCount(dataObject?.transfer);
    }
    const TransferCountException=()=>{}

    return (
        <div style={{width:'95%', height:'50vh'}}>
            <Grid container spacing={2} style={{marginTop:'20px', marginLeft:'20px'}}>
                <Grid item xs={10} sm={4} md={3.5} lg={1.8} xl={1.9}
                    style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        marginTop:'10px',
                        border: 'solid',
                        borderColor: 'aqua',  
                }}>
                        <Typography variant="h6" gutterBottom>
                            Total Asset
                        </Typography>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'10px'
                        }}>
                            <Typography variant="h6" gutterBottom
                                style={{ marginRight:'65%' , color:'aqua',}}
                                >
                                {assetCount}
                            </Typography>
                            {
                                 user === true &&
                                <Link to='/asset' >
                                    <FileCopyIcon className='dash-icon' style={{
                                        color: 'aqua',
                                        fontSize: '32'
                                    }} /> 
                                </Link>
                            }
                        </div>
                </Grid>
                <Grid item xs={10} sm={4} md={3.5} lg={1.8} xl={1.9}
                    style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        marginTop:'10px',
                        border: 'solid',
                        borderColor: 'aqua',
                    }}>
                        <Typography variant="h6" gutterBottom>
                        New Asset
                        </Typography>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'10px',
                        }}> 
                        <Typography variant="h6" gutterBottom
                        style={{ marginRight:'62%' , color:'aqua'}}>
                            {newAssetCount}
                        </Typography>
                        {
                            user === true && 
                            <AddBoxIcon className='dash-icon1'
                            style={{fontSize: '36' }} 
                            />     
                        }
                           
                    </div>
                </Grid>
                <Grid item xs={10} sm={4} md={3.5} lg={1.8} xl={1.9}
                    style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        marginTop:'10px',
                        border: 'solid',
                        borderColor: 'aqua',
                    }}>
                        <Typography variant="h6" gutterBottom>
                        Asset Tagged
                        </Typography>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'10px'
                        }}>    
                        <Typography variant="h6" gutterBottom
                            style={{ marginRight:'68%' , color:'aqua'}}>{tagAssets}</Typography>
                            {
                                user === true && 
                                    <Link to='/tagassettable'><StyleIcon className='dash-icon2' 
                                    style={{
                                        color: 'aqua',
                                        fontSize: '32'
                                    }}
                                    /></Link>
                            }
                           
                    </div>
                </Grid>
                <Grid item xs={10} sm={4} md={3.5} lg={1.8} xl={1.8}
                    style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        marginTop:'10px',
                        border: 'solid',
                        borderColor: 'aqua',    
                    }}>
                        <Typography variant="h6" gutterBottom>
                            Untagged Asset
                        </Typography>
                    
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'10px'
                            
                        }}>   
                        <Typography variant="h5" gutterBottom
                        style={{ marginRight:'68%' , color:'aqua'}}>{untagCount}</Typography>
                        {
                            user === true &&
                       
                            <Link to='/UntageAssetList'><LocalOfferIcon className='dash-icon3' 
                                style={{
                                    color: 'aqua',
                                    fontSize: '32'
                                }}
                            /></Link>
                        }
                    </div>
                </Grid>
                <Grid item xs={10} sm={4} md={3.5} lg={1.8} xl={1.8}
                    style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        marginTop:'10px',
                        border: 'solid',
                        borderColor: 'aqua',

                    }}>
                        <div style={{marginBotm:'2px'}}>
                            <span > {dateTime.date}</span> 
                        </div>
                        <div>
                            <span> {dateTime.time}</span>
                        </div>
                        
                </Grid>
                <Grid item xs={10} sm={4} md={3.5} lg={1.8} xl={1.8}
                    style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        marginTop:'10px',
                        border: 'solid',
                        borderColor: 'aqua',
                    }}> 
                        <div style={{
                            marginBottom:'10px',
                            alignItems: 'center',
                        }}>    
                    <img src={img} style={{alignSelf:'center',alignItems: 'center',}} height="40px" width="40px"/>
                    <Typography variant="h6" gutterBottom>
                            AssetManagment
                    </Typography>   
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{marginLeft:'20px'}}>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box',
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
        
                    }}>
                    
                    <div clasName='cards'>
                        <Typography variant="h6" gutterBottom>
                            Warranty Due
                        </Typography>         
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom:'10px'
                    }}>
                        <Typography variant="h5" gutterBottom
                            style={{ marginRight:'60%' , color:'aqua', }}
                            >
                            {warrantyDueCount}
                        </Typography>   
                        <Link to='/WarrantyDue'><SettingsIcon className='icondash'
                            style={{
                                    fontSize: '60'
                        }} /> 
                </Link>
                    </div>
                </Grid>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'

                }}>
                    <div>
                        <Typography variant="h6" gutterBottom>
                            Service Due
                        </Typography>     
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom:'10px'
                    }}>
                        <Typography variant="h5" gutterBottom
                            style={{ marginRight:'60%' , color:'aqua', }}
                            >
                            {serviceeDueCount}
                        </Typography>   
                        <Link to='/Servicedue'><ReportProblemIcon className='icondash'
                            style={{
                                    fontSize: '60'
                        }} /> 
                </Link>
                    </div>
                
                </Grid>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
        
                    }}>
                <div > 
                    <Typography variant="h6" gutterBottom>
                        Inspection Due
                    </Typography>             
                </div>
                <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom:'10px'
                    }}>
                    <Typography variant="h5" gutterBottom
                        style={{ marginRight:'60%' , color:'aqua', }}>
                        {inspectionDueCount}
                    </Typography>   
                    <Link to='/InspectionDue'><HandymanIcon className='icondash'
                        style={{
                                fontSize: '60'
                    }} /> 
                    </Link>
                </div>
                </Grid>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
                    }}>
                    <Typography variant="h6" gutterBottom>
                        AMC Due
                    </Typography> 
                        <div style={{
                            display: 'flex',
                            alignItems: 'center', 
                            marginBottom:'10px'
                        }}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                {amcDueCount}
                            </Typography>        
                            <Link to='/Amcdue'><BuildIcon className='icondash' style={{
                            fontSize: '60'
                            }}/></Link>
                        </div>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{marginLeft:'20px'}}>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
        
                    }}>
                    <Typography variant="h6" gutterBottom>
                    Certificate Due
                    </Typography> 
                    <div style={{display: 'flex',alignItems: 'center', marginBottom:'10px'}}>
                        <Typography variant="h5" gutterBottom
                            style={{ marginRight:'60%' , color:'aqua', }}>
                            {certificateDueCount}
                        </Typography>
                        <Link to='/CertificateDue'><NewReleasesIcon className='icondash' style={{
                                fontSize: '60'
                        }}/></Link>
                    </div>
                </Grid>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
                    }}>
                        <Typography variant="h6" gutterBottom>
                            Insurance Due
                        </Typography> 
                        <div style={{display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                {insuranceDueCount}
                            </Typography>
                            <Link to='/Insurancedue'><HourglassFullIcon className='icondash' style={{
                                fontSize: '60'
                                }} /></Link>
                        </div>
                </Grid>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
        
                    }}>
                    <Typography variant="h6" gutterBottom>
                        Transfer Due
                    </Typography> 
                    <div style={{display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
                        <Typography variant="h5" gutterBottom
                            style={{ marginRight:'60%' , color:'aqua', }}>
                            {transferDueCount}
                        </Typography>
                        <Link to='/Transferdue'><SyncAltIcon className='icondash' style={{
                                fontSize: '60'
                            }} /></Link>
                    </div>
                </Grid>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'
        
                }}>
                    <Typography variant="h6" gutterBottom>
                    Audit Due
                    </Typography>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
                        <Typography variant="h5" gutterBottom
                            style={{ marginRight:'60%' , color:'aqua', }}>
                            { auditDueCount}
                        </Typography>
                        <Link to='/Auditdue'><SettingsApplicationsIcon className='icondash' style={{
                                fontSize: '60'
                            }} /></Link>
                    </div>
                </Grid>
            </Grid>
            {     
            user === true &&
                <Grid container spacing={2} style={{marginLeft:'20px'}}>
                    <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                            style={{
                            color: 'white',
                            display: 'box'  ,
                            background:'rgb(91, 87, 87)',
                            marginRight:'20px',
                            border: 'solid',
                            borderColor: 'aqua',
                            marginTop:'30px'
            
                    }}>
                        <Typography variant="h6" gutterBottom>
                        EOL 
                        </Typography>
                        <div style={{ display: 'flex',alignItems: 'center', marginBottom:'10px'}}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                { eolCount}
                            </Typography>
                            <Link to='/Eol'><Battery50Icon className='icondash' style={{
                                fontSize: '60'
                            }}/></Link>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                            style={{
                            color: 'white',
                            display: 'box'  ,
                            background:'rgb(91, 87, 87)',
                            marginRight:'20px',
                            border: 'solid',
                            borderColor: 'aqua',
                            marginTop:'30px'
            
                    }}>
                        <Typography variant="h6" gutterBottom>
                            Not Found
                        </Typography>
                        <div style={{ display: 'flex',alignItems: 'center', marginBottom:'10px'}}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                {notFound}
                            </Typography>
                            <DangerousIcon className='icondash' style={{
                                fontSize: '60'
                            }}/>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                            style={{
                            color: 'white',
                            display: 'box'  ,
                            background:'rgb(91, 87, 87)',
                            marginRight:'20px',
                            border: 'solid',
                            borderColor: 'aqua',
                            marginTop:'30px'
            
                    }}>
                        <Typography variant="h6" gutterBottom>
                        Not in Use
                        </Typography>
                        <div style={{ display: 'flex',alignItems: 'center', marginBottom:'10px'}}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                { notInuseCount}
                            </Typography>
                            <Link to='/Notinuse'><NotInterestedIcon className='icondash' style={{
                                fontSize: '60'
                            }}/></Link>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                            style={{
                            color: 'white',
                            display: 'box'  ,
                            background:'rgb(91, 87, 87)',
                            marginRight:'20px',
                            border: 'solid',
                            borderColor: 'aqua',
                            marginTop:'30px'
            
                    }}>
                        <Typography variant="h6" gutterBottom>
                            Damage
                        </Typography>
                        <div style={{ display: 'flex',alignItems: 'center', marginBottom:'10px'}}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                { damageCount }
                            </Typography>
                            <Link to='/Damage'><EventBusyIcon className='icondash'  style={{
                                fontSize: '60'
                            }}/></Link>
                        </div>
                    </Grid>
                </Grid>
            }
            <Grid container spacing={2} style={{marginLeft:'20px'}}>
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'

                }}>
                    <Typography variant="h6" gutterBottom>
                        Transfer
                    </Typography>
                    <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'10px'    
                    }}>
                        <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                { transferCount }
                        </Typography>
                        <Link to='/Transfer'><ShuffleIcon className='icondash' style={{
                            fontSize: '60'
                        }}/></Link>
                    </div>
                </Grid>      
                <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                        style={{
                        color: 'white',
                        display: 'box'  ,
                        background:'rgb(91, 87, 87)',
                        marginRight:'20px',
                        border: 'solid',
                        borderColor: 'aqua',
                        marginTop:'30px'

                }}>
                    <Typography variant="h6" gutterBottom>
                        In Service
                    </Typography>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'10px'
                        }}>
                            <Typography variant="h5" gutterBottom
                                style={{ marginRight:'60%' , color:'aqua', }}>
                                { inServiceCount }
                            </Typography>
                            
                            <Link to='/Inservice'><SettingsSuggestIcon className='icondash' style={{
                                fontSize: '60'
                            }}/></Link>
                        </div>
                </Grid>
                {
                user === true &&
                    <>
                        <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                                style={{
                                color: 'white',
                                display: 'box'  ,
                                background:'rgb(91, 87, 87)',
                                marginRight:'20px',
                                border: 'solid',
                                borderColor: 'aqua',
                                marginTop:'30px',
                                marginBottom:'5px'
                        }}>
                            <Typography variant="h6" gutterBottom>
                                Sale
                            </Typography>
                            <div style={{ display: 'flex',alignItems: 'center', marginBottom:'10px'}}>
                                    <Typography variant="h5" gutterBottom
                                    style={{ marginRight:'60%' , color:'aqua', }}>
                                    { salesCount }
                                </Typography> 
                                    <Link to='/Sale'><InsertDriveFileIcon className='icondash' style={{
                                        fontSize: '60'
                                    }}/></Link>
                            </div>
                        </Grid>
                        <Grid item xs={10} sm={4.5} md={2.7} lg={2.8} xl={2.8} 
                            style={{
                            color: 'white',
                            display: 'box'  ,
                            background:'rgb(91, 87, 87)',
                            marginRight:'20px',
                            border: 'solid',
                            borderColor: 'aqua',
                            marginTop:'30px',
                            marginBottom:'5px'

                        }}>
                            <Typography variant="h6" gutterBottom>
                                Scrap
                            </Typography>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom:'10px'
                            }}>
                                <Typography variant="h5" gutterBottom
                                    style={{ marginRight:'60%' , color:'aqua', }}>
                                    { scrapCount }
                                </Typography> 
                                <Link to='/Scrap'><DeleteIcon  className='icondash' style={{
                                    fontSize: '60'
                                }}/></Link>
                            </div>
                        </Grid>
                    </>
                }
            </Grid>
    </div>
    )
}

export default Main;