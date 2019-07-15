import React, { useEffect, useState } from 'react'

export const RouterContext = React.createContext('Router')

export default function Router(props) {

    const [location, setLocation] = useState(props.history.location)

    useEffect(() => {
        return props.history.addListener((location) => {
            setLocation(location)
        })
    }, [])
    return (
        <RouterContext.Provider value={{
            history: props.history,
            location: location,
            match: Router.computeRootMatch(location.pathname),
        }}>
            {props.children}
        </RouterContext.Provider>
    )
}
Router.computeRootMatch = (pathname) => {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
}