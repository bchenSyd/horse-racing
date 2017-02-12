import React, { Component } from 'react'
import { render } from 'react-dom'
import BettingPage from './components/bettingPage'

const root = document.createElement('div')
root.className = 'root'
document.body.appendChild(root)
render(<BettingPage />, root)