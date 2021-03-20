import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core'

// define css with jss; use JS to describe styles
// withStyle & makeStyles

// const useStyle= makeStyles({
//     sideMenu:{
//         display:'flex',
//         flexDirection:'column',
//         position:'absolute',
//         left:'0px',
//         width: '320px',
//         height: '100%',
//         backgroundColor: '#da880d'
//     }
// })

const style= {
        sideMenu:{
            display:'flex',
            flexDirection:'column',
            position:'absolute',
            left:'0px',
            width: '320px',
            height: '100%',
            // marginTop: '65px',
            backgroundColor: '#da880d'
        }
    }
const SideMenu=(props)=>{
    const{classes} = props;

// export default function SideMenu() {
    // const classes = useStyle();
    // console.log(classes)
    return (
        <div className= {classes.sideMenu}>
            
        </div>
    )
// }

}
export default withStyles(style) (SideMenu);

