import React, { createContext, useContext, useState } from 'react';

// Create a Context for the socket
const SocketContext = createContext(null);

// Create a custom hook to use the SocketContext
export const useSocket = () => {
    return useContext(SocketContext);
};

// Create a provider component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
};