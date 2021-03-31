import React, { useState, useEffect } from 'react'
import ProjectForm from './ProjectForm'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid } from '@material-ui/core';
import useTable from './useTable'
import * as projectService from './projectService'
import Controls from './controls/Controls'
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from './Popup'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)

    },
    searchInput: {
        width: '30%'
    },
    newButton: {
        width: '20%',
        position: 'right',
        left: '300px'
    }
}))



const headCells = [
    { id: 'id', label: 'Project ID' },
    { id: 'projName', label: 'Project Name' },
    // { id: 'status', label: 'Status' },
    { id: 'dateCreated', label: 'Date Created', disableSorting: true },
    { id: 'lastEdited', label: 'Last Edited', disableSorting: true },
    { id: 'comment', label: 'Comment' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]


function Project(props) {
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [userID, setUserID] = useState(props.userID);

    const classes = useStyles();

    const [records, setRecords] = useState(projectService.getAllProjects())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.projName.toLowerCase().includes(target.value))
            }
        })
    }

    //POP UP SECTION
    const addOrEdit = (project, resetForm) => {
        if (project.id == 0){ //if project id DNE
            //projectService.insertProject(project) //NEED CHANGE

            fetch('/project',{

                method: "POST",
                cache: 'force-cache',
                credentials: 'include',
                withCredentials: true,
                headers: {
                    "content_type": "application/json",
                },
                body: JSON.stringify({
                    'projName': project.projName,
                    'comment': project.comment
                })

            }).then(response => {
                return response.json() //jasonify
            }).then(data => {
                console.log(data);
            });
        }
        else{
            projectService.updateProject(project)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(projectService.getAllProjects())
        
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    //POP UP SECTION


    //DELETE FX
    const onDelete = id => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            projectService.deleteProject(id);
            setRecords(projectService.getAllProjects())
        }
    }

    // synchronize with App.js's login status
    useEffect(() => {
        console.log('login status updated', props.isLogin);
        console.log('userID updated', props.userID);
        setUserID(props.userID)
        setIsLogin(props.isLogin)
    }, [props.isLogin, props.userID])


    if (isLogin) {
        return (
            <>

                <Paper className={classes.pageContent}>

                    <Toolbar>
                    {/* <Grid> */}
                        <Controls.Input
                            label="Search Projects"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                        {/* </Grid> */}

                       
                        <Controls.Button
                            text="Create Project"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />
                        
                    </Toolbar>
                    <TblContainer>

                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.projName}</TableCell>
                                    {/* <TableCell>{item.status}</TableCell> */}
                                    <TableCell>{item.dateCreated}</TableCell>
                                    <TableCell>{item.lastEdited}</TableCell>
                                    <TableCell>{item.comment}</TableCell>

                                    {/* POPUP section */}
                                    <TableCell>
                                    
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                onDelete(item.id)
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                               
                                    </TableCell>
                                    {/* POPUP section */}

                                </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>

                <Popup
                    title="Project Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <ProjectForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} />
                </Popup>


            </>
        )
    } else {
        return <Redirect to='/login' />;
    }

}

export default Project
