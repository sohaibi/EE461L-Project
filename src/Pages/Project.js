import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import React, {useState} from 'react';
import useTable from '../components/useTable';
import ProjectForm from './ProjectForm';
import * as projectService from '../services/projectService';
import { Search } from '@material-ui/icons';
import Controls from "../components/controls/Controls";
//Edit Icons & Pop up
import AddIcon from '@material-ui/icons/Add';
import Popup from "../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=>({
    pageContent:{
        margin:theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'projectName', label: 'Project Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'department', label: 'Type', disableSorting: false },
    { id: 'actions', label: 'Actions', disableSorting: true }
]
// certain types of property shoudl disableSorting 


export default function Project() {

    const classes = useStyles();
    const [records, setRecords]= useState(projectService.getAllProjects())
    
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)


    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells,filterFn);

    
    //Search feature
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items; //if search is "", dispaly all
                else
                    return items.filter(x => x.projectName.toLowerCase().includes(target.value))
            }
        })
    }

    //Edit feature [Popup Dialog Vid]
    const addOrEdit = (project, resetForm) => {
        if (project.id == 0)
            projectService.insertProject(project)
        else
            projectService.updateProject(project)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(projectService.getAllProjects())
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            <Paper className={classes.pageContent}>
                {/* <ProjectForm/> */}
               
         
                <Toolbar>        {/* {...other} in input.js */ }  
                    <Controls.Input
                        label="Search Projects"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search /> {/*icon*/}
                            </InputAdornment>)
                        }} 
                        onChange={handleSearch}
                    />

                    {/* Edit Button */}
                    <Controls.Button
                        text="Add New"
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
                                    <TableCell>{item.projectName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                            
                                    {/* Edit Button */}
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>

                                        <Controls.ActionButton
                                            color="secondary"
                                            >
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                            
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>    {/* paging feature*/} 
            </Paper>

            {/* Pop up section */}
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
}
