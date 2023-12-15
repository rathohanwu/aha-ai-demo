import * as React from 'react';
import Box from '@mui/material/Box';
import {Drawer as MaterialUIDrawer} from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {useRouter} from "next/router";
import {useModal} from "@/hooks/modal/useModal";

function Drawer() {

    const drawer = useModal();
    const router = useRouter();

    return (
        <div>
            <Button onClick={drawer.open}><MenuIcon/></Button>
            <MaterialUIDrawer
                anchor={"left"}
                open={drawer.isOpen}
                onClose={drawer.close}
            >
                <Box
                    role="presentation"
                    width={250}
                >
                    <Divider/>
                    <List>
                        <ListItem key={"profile"} disablePadding>
                            <ListItemButton onClick={() => router.push("/profile")}>
                                <ListItemIcon>
                                    <AccountBoxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Profile"}/>
                            </ListItemButton>
                        </ListItem>

                        <ListItem key={"dashboard"} disablePadding>
                            <ListItemButton onClick={() => router.push("/dashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </MaterialUIDrawer>
        </div>
    );
}

export {Drawer}