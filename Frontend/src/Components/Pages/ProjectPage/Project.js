import React from 'react'
import ProjectForm from './ProjectForm'
import { Paper,makeStyles } from '@material-ui/core';
function Project() {

    const useStyles = makeStyles(theme => ({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3)
        }
    }))

    const classes = useStyles();
    return (
        <>
        <Paper className={classes.pageContent}>
            <ProjectForm/>
         </Paper>
        </>
    )
}

export default Project
