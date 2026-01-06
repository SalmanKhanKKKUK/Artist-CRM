import React, { useState } from 'react'
import Dashboard from '../components/screens/Dashboard/Dashboard'
import WelcomePage from '../components/screens/WelcomePage/WelcomePage'

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <>
      {showDashboard ? <Dashboard onBack={() => setShowDashboard(false)} /> : <WelcomePage onLoginSuccess={() => setShowDashboard(true)} />}
    </>
  )
}

export default Index


