/* eslint-disable no-unused-vars */

//NAVBAR COMPONENT


import React, { useState } from "react";
// import Logo from "../Assets/background-bg.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import toast from 'react-hot-toast'

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
//   const navigate = useNavigate();
//   function gotoproducts() {
//     navigate('/products')
//   }
//   const handleLogout = async () => {
//     try {
//       Cookies.remove('authToken');
//       Cookies.remove('userIDcookie');
//       localStorage.removeItem('cartID')
//       toast.success('You have been logged out')
//       navigate('/login')
//     } catch (error) {
//       console.log(error);
//       toast.error('Error logging out')
//     }
//   }


// function handleNavigation(){
//   navigate('/home')
// }

// function handlecartnavigation(){
//   navigate('/cart')
// }

// function handleorders(){
//   navigate('/orderpanel')
// }


  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      
    },
    {
      text: "About",
      icon: <InfoIcon />,
      
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
 
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,

   },
    // {
    //   text: "Logout",
    //   icon: <ExitToAppIcon />,

    // },
    // {
    //   text: "My Orders",
    //   icon: < InventoryIcon/>,
   
    // },
  ];


  return (
    <nav>
      {/* <div className="nav-logo-container">
        <img src={Logo} alt="" height={55} width={100} />
      </div> */}
      <div className="navbar-links-container">
        <a href="/home">Home</a>
        <a href="/home">About</a>
        <a href="/home">Testimonials</a>
        <a href="/home">Contact</a>
        <a href="/orderpanel">My Orders</a>
        <BsCart2 className="navbar-cart-icon" />
        {/* <button className="primary-button" >SHOP NOW</button> 
        <button className="logout" >Logout</button> */}
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;