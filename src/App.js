import React, { useEffect, useState } from 'react';
import Router from './mini-react-router'
import Route from './mini-react-router/Route'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Route path='/' component={Bar} mode='mobile'/>
    </div>
  );
}

function User1(props) {
  let [num, set] = useState(0)
  setInterval(() => { set(++num) }, 1000)
  return (
    <div>
      <h3>num:{num}</h3>
      <button onClick={()=>{
        props.history.push({
          pathname: '/user1/detail'
        })
      }}>to detail</button>
      <Route path='/user1/detail' component={Detail} mode='mobile'></Route>
    </div>
  )
}

function Detail(props) {
  return (
    <button onClick={() => {
      props.history.goBack()
    }}>user1</button>
  )
}

function Bar(props) {
  return <h3>
    <button onClick={() => {
      props.history.push({
        pathname: '/user1',
      })
    }}>user1</button>
    <Route path='/user1' component={User1} mode='mobile' />
  </h3>
}

export default function () {
  return <Router><App /></Router>
};
