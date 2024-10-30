import React from "react";

const Copyright=()=>{
    const currentYear= new Date().getFullYear();
    return(
        <p style={{marginLeft : '20%'}}>&copy;{currentYear} by BO-Tech.</p>
    );
};
export default Copyright;