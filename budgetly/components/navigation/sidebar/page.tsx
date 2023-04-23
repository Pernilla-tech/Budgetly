"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import CategoryIcon from "@mui/icons-material/Category";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./page.module.css";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "../../providers/supabase-auth-provider";

type Anchor = "left";

type SidebarProps = {
  anchor: Anchor;
};

const Sidebar: React.FC<SidebarProps> = ({ anchor }) => {
  const [state, setState] = React.useState({
    [anchor]: false,
  });

  const router = useRouter();
  const { signOut } = useAuth();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = () => (
    <Box
      className={styles.sidebar}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Edit monthly budget", "Edit categories"].map((text, index) => (
          <ListItem key={text} disablePadding style={{ color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <IconButton
                    className={styles.iconbutton}
                    onClick={() => router.push("/editbudget")}
                  >
                    <ModeEditIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    className={styles.iconbutton}
                    onClick={() => router.push("/expenses")}
                  >
                    <CategoryIcon />
                  </IconButton>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Log out"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <IconButton className={styles.iconbutton} onClick={signOut}>
                  <LogoutOutlinedIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={styles.menuicon}>
      {anchor === "left" && (
        <>
          <IconButton onClick={toggleDrawer(true)} style={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </>
      )}
    </div>
  );
};

export default Sidebar;
