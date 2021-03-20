import { AppBar, Grid, Badge, IconButton, InputBase, Toolbar, makeStyles } from '@material-ui/core'
import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
// overwrite default theme
const useStyles = makeStyles({
    root: {
        backgroundColor: '#f57e42'
    },

    searchInput:{
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '0.8 rem',
        '&:hover':{
            backgroundColor: '#fff'
        },
        '& .MuiSvgIcon-root':{
            marginRight: '8px'
        }
    },
    // customize MUI @15:30
    btn: {
        backgroundColor: 'red'
    }
}) 
// '&' reference selectpr of the parent rule
    
export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position ="static" className = {classes.root}>
            <Toolbar>
                <Grid container alignItems='center'>  
                    <Grid item sm ={8} style ={{border: '1px solid #fff'}}>
                        <InputBase
                        className= {classes.searchInput}
                        placeholder = "Search Project"
                        startAdornment ={<SearchIcon />}
                        />
                        
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton>
                            <Badge badgeContent ={4} color='secondary'>
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>

                        <IconButton>
                            <Badge badgeContent ={3} color='primary'>
                                <ChatBubbleOutlineIcon />
                            </Badge>
                        </IconButton>

                        <IconButton>
                                <PowerSettingsNewIcon />               
                        </IconButton>
                        
                    </Grid>
                </Grid> 

            </Toolbar>
        </AppBar>
    )
}
