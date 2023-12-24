import { Outlet } from "react-router-dom"

import React from 'react'

export default function Layout() {
    return(
            <main className="App">
                <Outlet />
            </main>
        )
}
