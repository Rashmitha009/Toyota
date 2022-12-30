import { Grid, Stack } from '@mui/material';
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MaintenanceDataTable = ({ approvalUnitList, index}) => {
  return (
    <div>
       <Grid container>
                <Grid xs={6} md={1} lg={2} >
                    <div className="task">
                        <div>
                           
                            <label> <b>Name:</b></label>
                            <p className="measureUnit">{approvalUnitList.name}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={1} lg={2} >
                    <div className="task">
                        <div>
                           
                            <label> <b>Partid:</b></label>
                            <p className="measureUnit">{approvalUnitList.partid}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2} lg={2} >
                    <div className="task">
                        <div>
                            
                            <label> <b>Quantity:</b></label>
                            <p className="measureUnit">{approvalUnitList.quantity}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2} lg={2} >
                    <div className="task">
                        <div>
                           
                            <label><b>UOM:</b></label>
                            <p className="measureUnit">{approvalUnitList.UOM}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2} lg={2}>
                    <div className="task">
                        <div>
                           
                            <label><b>Unit price:</b></label>
                            <p className="measureUnit">{approvalUnitList.unitPrice}</p>
                        </div>
                    </div>
                </Grid>
               
            </Grid>
    </div>
  )
}

export default MaintenanceDataTable
