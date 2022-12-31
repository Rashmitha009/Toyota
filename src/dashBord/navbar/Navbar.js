import { Grid, Typography } from "@mui/material";
import "./Navbar.css";
import img from "./rdl.png"

const Navbar = () => {
    return (
        <nav className="navbar" >
            <Grid container>
                <Grid item xs={1} sm={4} md={7} lg={9} xl={9}>
                </Grid>
                <Grid item xs={11} sm={5} md={4} lg={3} xl={3}>
                    <Typography variant="h5" gutterBottom
                        style={{
                            alignContent:'',
                            color: 'aqua',
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf:'left',
                            textAlign:'left',
                           
                    }}>
                         <img src={img} height="40px" width="40px"/>
                            Asset Managment
                    </Typography>
                </Grid>
            </Grid>    
        </nav>
    )
}

export default Navbar;