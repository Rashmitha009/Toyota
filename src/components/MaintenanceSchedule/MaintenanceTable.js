import { Grid, Stack } from '@mui/material';
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Maintenance = ({ maintenance, index, removeMaintenance, updateMaintenance, }) => {
    return (
        <div>
            <Grid container>
                <Grid xs={6} md={1}>
                    <div className="task">
                        <div>
                            {/* eslint-disable-next-line */}
                            <label>Name:</label>
                            <p className="measureUnit">{maintenance.name}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={1}>
                    <div className="task">
                        <div>
                            {/* eslint-disable-next-line */}
                            <label>Partid:</label>
                            <p className="measureUnit">{maintenance.partid}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2}>
                    <div className="task">
                        <div>
                            {/* eslint-disable-next-line */}
                            <label>Quantity:</label>
                            <p className="measureUnit">{maintenance.quantity}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2}>
                    <div className="task">
                        <div>
                            {/* eslint-disable-next-line */}
                            <label>UOM:</label>
                            <p className="measureUnit">{maintenance.UOM}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2}>
                    <div className="task">
                        <div>
                            {/* eslint-disable-next-line */}
                            <label>Unit price:</label>
                            <p className="measureUnit">{maintenance.unitPrice}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2}>
                    <div className="task">
                        <div>
                            {/* eslint-disable-next-line */}
                            <label>Part or Consumable:</label>
                            <p className="measureUnit">{maintenance.partOption}</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} md={2}>
                    <div className="task">
                        <Stack direction="row" spacing={2}>
                            <EditIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    updateMaintenance(index);
                                }}
                            />
                            <DeleteIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    removeMaintenance(index);
                                }}
                            />
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}


export default Maintenance
