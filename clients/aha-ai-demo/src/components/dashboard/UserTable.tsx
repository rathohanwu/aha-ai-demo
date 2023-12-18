import {Paper, Table, TableContainer, TableRow, TableHead, TableCell, TableBody} from "@mui/material";
import {formatDate} from "@/utils/date";
import {useUsers} from "@/hooks/dashboard/useUsers";

function UserTable() {

    const {users} = useUsers();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Sign Up Time</TableCell>
                            <TableCell align="right">Login Times</TableCell>
                            <TableCell align="right">Last Session Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((account) => (
                            <TableRow
                                key={account.email}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {account.name} ({account.email})
                                </TableCell>
                                <TableCell align="right">{formatDate(account.signUpTime)}</TableCell>
                                <TableCell align="right">{account._count.logins}</TableCell>
                                <TableCell align="right">{formatDate(account.activeTime)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default UserTable