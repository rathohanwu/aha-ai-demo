import {Account} from "@/types/account";
import {LinearProgress, Paper, Table, TableContainer, TableRow, TableHead, TableCell, TableBody} from "@mui/material";

type Props = {
    verified: boolean,
    accounts: Account[]
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function UserStatistics(props: Props) {

    const {verified, accounts} = props;
    if (!verified) return <div></div>

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Sign Up Time</TableCell>
                            <TableCell align="right">Login Times</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow
                                key={account.email}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {account.name}
                                </TableCell>
                                <TableCell align="right">{account.email}</TableCell>
                                <TableCell align="right">{account.signUpTime}</TableCell>
                                <TableCell align="right">{account._count.logins}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserStatistics