import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid } from '@material-ui/core';
import useTable from './useTable';
import * as projectService from './projectService';
import Controls from './controls/Controls';
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
        width: '40%',
        position: 'left'
    },
    newButton: {
        width: '20%',
        position: 'right',
        left: '300px'
    }
}))



const headCells = [
    { id: '_id', label: 'Project ID', disableSorting: true },
    { id: 'project_name', label: 'Project Name' },
    // { id: 'owner_id', label: 'Owner ID', disableSorting: true },
    { id: 'date_created', label: 'Date Created' },
    { id: 'last_edited', label: 'Last Edited' },
    { id: 'comment', label: 'Comment', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }
]



function Project(props) {
    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [userID, setUserID] = useState(props.userID);

    const classes = useStyles();
    // const [records, setRecords] = useState(projectService.getAllProjects())
    const [records, setRecords] = useState([]) //need para?
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false) // bool to indicate if popup should open
    const [updateToggle, setUpdateToggle] = useState(false)
    const [popUpTitle, setPopUpTitle] = useState('')
    const [isDelete, setIsDelete] = useState(false)
    const {
        TblContainer,
        TblHead,  // defined by headCells
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);// 要验证多久刷新一次

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

    // load user's project data 
    useEffect(() => {
        fetch('/project', {

            method: "GET",
            cache: 'default',
            credentials: 'include',
            withCredentials: true,
            headers: {
                "Content_Type": "application/json",
                'Accept': 'application/json'
            }

        }).then(response => {
            //response.json()
            return response.json() //jsonify
        }).then(data => {
            console.log("records when loading", data);

            setRecords(data['records']);
            setUpdateToggle(!updateToggle);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    // update the page when record is updated
    // useEffect(() => {
    //     // const {
    //     //     TblContainer,
    //     //     TblHead,  // defined by headCells
    //     //     TblPagination,
    //     //     recordsAfterPagingAndSorting
    //     // } = useTable(records, headCells, filterFn);// 要验证多久刷新一次


    // }, [updateToggle])




    //POP UP SECTION
    const makeAction = (project, resetForm) => {
        console.log(project);
        var request = {};
        if (recordForEdit == null) {
            request['action'] = "create";
            request['project_name'] = project.project_name;
            request['comment'] = project.comment

        } else if (isDelete) {
            request['project_id'] = project['_id']
            request['action'] = "delete"

        } else {
            request['project_id'] = project['_id']
            request['project_name'] = project.project_name;
            request['comment'] = project.comment
            request['action'] = "update"

        }
        console.log("request", request)


        fetch('/project', {

            method: "POST",
            cache: 'force-cache',
            credentials: 'include',
            withCredentials: true,
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify(
                request
            )

        }).then(response => {
            return response.json() //jasonify
        }).then(data => {
            console.log(data);
            console.log("records when updating", data);
            setRecords(data['records']); // reset records
        });




        resetForm() //  parameter pass from child
        setRecordForEdit(null)
        setOpenPopup(false)





    }

    const openInPopup = item => {
        setRecordForEdit(item)
        console.log("record for edit:", item);
        setOpenPopup(true)
    }
    //POP UP SECTION


    //DELETE FX
    // const onDelete = id => {
    //     if (window.confirm('Are you sure you want to delete this project?')) {
    //         // projectService.deleteProject(id);

    //         fetch('/project', {

    //             method: "POST",
    //             cache: 'force-cache',
    //             credentials: 'include',
    //             withCredentials: true,
    //             headers: {
    //                 "content_type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 'action': "delete",
    //                 'project_id': id
    //             })

    //         }).then(response => {
    //             return response.json() //jasonify
    //         }).then(data => {
    //             console.log(data);
    //         });

    //         setRecords(projectService.getAllProjects())
    //     }
    // }

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

                    <Toolbar >
                        {/* <Grid> */}
                        {/* <Controls.Input
                            label="Search Projects"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        /> */}
                        {/* </Grid> */}


                        <Controls.Button
                            text="Create Project"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => {
                                setIsDelete(false);
                                setPopUpTitle('Create Project');
                                setOpenPopup(true);
                                setRecordForEdit(null);
                            }}
                        />
                        {/* <Controls.Button
                            text="Join Project"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        /> */}

                    </Toolbar>
                    <TblContainer>

                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item._id}</TableCell>
                                    <TableCell>{item.project_name}</TableCell>
                                    {/* <TableCell>{item.status}</TableCell> */}
                                    <TableCell>{item.date_created}</TableCell>
                                    <TableCell>{item.last_edited}</TableCell>
                                    <TableCell>{item.comment}</TableCell>

                                    {/* POPUP section */}
                                    <TableCell>

                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                setIsDelete(false)
                                                setPopUpTitle('Edit Project');
                                                openInPopup(item)
                                            }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                // onDelete(item._id)
                                                setIsDelete(true)
                                                setPopUpTitle('Delete Project');
                                                openInPopup(item)

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
                    title={popUpTitle}
                    openPopup={openPopup} // boolean to indicate Popup is enabled or not
                    setOpenPopup={setOpenPopup}  // setOpenPopup bool function
                >
                    <ProjectForm
                        recordForEdit={recordForEdit}
                        makeAction={makeAction}
                        isDelete={isDelete}
                    />
                </Popup>


            </>
        )
    } else {
        return <Redirect to='/login' />;
    }

}

export default Project
