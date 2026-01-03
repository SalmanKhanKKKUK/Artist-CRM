import React, { useState } from 'react'
import Home from '../components/screens/Home/Home'
import WelcomePage from '../components/screens/WelcomePage/WelcomePage'

const Index = () => {
  const [showHome, setShowHome] = useState(false)

  return (
    <>
      {showHome ? <Home /> : <WelcomePage onLoginSuccess={() => setShowHome(true)} />}
    </>
  )
}

export default Index


