import createHistory from './history'
import React from 'react'
import Router from './Router'


export default function simpleRouter(props) {
    const history = createHistory()
    history.push({ pathname: '/' })
    return <Router history={history} children={props.children} />
}