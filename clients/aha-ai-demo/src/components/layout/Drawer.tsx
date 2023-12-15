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

    const handleNavigation = async (route: string) => {
        await router.push(route);
        drawer.close();
    };

    return (
        <div>
            <Button onClick={drawer.open}><MenuIcon/></Button>
            <MaterialUIDrawer
                anchor="left"
                open={drawer.isOpen}
                onClose={drawer.close}
            >
                <Box
                    role="presentation"
                    width={250}
                >
                    <Divider/>
                    <List>
                        {navItems.map(item => (
                            <NavItem
                                key={item.key}
                                item={item}
                                onClick={() => handleNavigation(item.route)}
                            />
                        ))}
                    </List>
                </Box>
            </MaterialUIDrawer>
        </div>
    )
}


type NavItemProps = {
    item: NavItemData;
    onClick: () => void;
}

type NavItemData = {
    key: string;
    text: string;
    icon: React.ReactNode;
    route: string;
}

const navItems: NavItemData[] = [
    {key: 'profile', text: 'Profile', icon: <AccountBoxIcon/>, route: '/profile'},
    {key: 'dashboard', text: 'Dashboard', icon: <DashboardIcon/>, route: '/dashboard'},
];

function NavItem({item, onClick}: NavItemProps) {
    return (
        <ListItem key={item.key} disablePadding>
            <ListItemButton onClick={onClick}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
            </ListItemButton>
        </ListItem>
    );
}

export {Drawer}