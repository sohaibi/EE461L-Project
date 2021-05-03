import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'

// some table css
const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '800',
            backgroundColor: '#f57e42',
            color: 'black'
            // backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '400',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
}))

export default function useTable(records, headCells, filterFn) {

    // const [records, setRecords] = useState(props.records);//need para?

    const classes = useStyles(); //apply css above
    const pages = [5, 10, 25] //paging config， how many rows per page
    const [page, setPage] = useState(0)  // index to configure how many rows per page
    const [rowsPerPage, setRowsPerPage] = useState(pages[0]) // should use another index ??

    const [order, setOrder] = useState('asc') //sorting  'asc','desc', false
    const [orderBy, setOrderBy] = useState() // headcell.id in Project.js


    // access everything in '<TblContainer>' in 'project.js'

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    // table head component; similar to Thead in html
    const TblHead = props => {

        //call in return() below
        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}

                            // sorting section
                            sortDirection={orderBy === headCell.id ? order : false}>
                            {headCell.disableSorting ? headCell.label :

                                <TableSortLabel
                                    active={orderBy === headCell.id} //highlight selected sorting type
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>

                            }

                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    //set page：   ??? this is not enabled??
    const handleChangePage = (event, newPage) => {
        var val = parseInt(event.target.value, 10);
        console.log(val);
        setPage(newPage);
    }

    //set row
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    // paging feature
    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)

    //sorting section:
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        // console.log("stabilizedThis before sort", stabilizedThis);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            // console.log("a is", a);
            if (order !== 0) return order;
            return a[1] - b[1]; //-1 switch, 0== same value // if value is the same, determined by default index
        });
        // console.log("stabilizedThis before mappling", stabilizedThis);
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    //handle both sorting and paging; 
    //.slice(): 0th page * 5row/p -> start entry @ 0; (0+1)*5-> end entry (not included)
    //so record index 0 to 4 on first page
    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    // synchronize with Project.js's records data
    // useEffect(() => {
    //     setRecords(props.records);
    //     console.log('records updated', props.records);
    // }, [props.records])


    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}