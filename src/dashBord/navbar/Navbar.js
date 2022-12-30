import { Grid, Typography } from "@mui/material";
import "./Navbar.css";
import img from "./rdl.png"

const Navbar = () => {
    return (
        <nav className="navbar" style={{
            height: '6vh',width:'98.2%'
        }}>
            <Grid container>
                <Grid item xs={0} sm={7} md={8} lg={8} xl={10}>
                </Grid>
                <Grid item xs={8} sm={4} md={3} lg={2.5} xl={1}>
                    <Typography variant="h5" gutterBottom
                        style={{
                            alignContent:'',
                            color: 'aqua',
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf:'left',
                            textAlign:'left',
                            justifyContent: 'space-between'
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