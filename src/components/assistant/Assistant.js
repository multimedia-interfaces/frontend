import React from "react";
import {useLocation} from "react-router-dom";
import Mascot from "../Mascot";
import OrderDemo from "../demos/OrderDemo";

export const Assistant = () => {
    const {pathname} = useLocation();

    const isAssistantAvailable = ['/', '/history', '/profile', '/order'].includes(pathname);

    return pathname === '/' ? (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
            }}>
                <OrderDemo/>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
            }}>
                {isAssistantAvailable && <Mascot/>}
            </div>
        </div>
    ) : (
        <div style={{width: '20vw', height: '60vh', position: 'absolute', right: 0, bottom: 0}}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {<OrderDemo/>}
            </div>
            {isAssistantAvailable && <Mascot/>}
        </div>
    );
};