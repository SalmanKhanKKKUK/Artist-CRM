import React, { useState } from 'react'
import CompanyName from '../components/screens/CompanyName/CompanyName'
import Dashboard from '../components/screens/Dashboard/Dashboard'
import Login from '../components/screens/Login/login'
import Signup from '../components/screens/Signup/Signup'

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false)
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'companyname'>('login')

  return (
    <>
      {showDashboard ? (
        <Dashboard onBack={() => setShowDashboard(false)} />
      ) : currentPage === 'login' ? (
        <Login 
          onNavigateToDashboard={() => setShowDashboard(true)} 
          onNavigateToSignup={() => setCurrentPage('signup')}
          onBack={() => {}}
        />
      ) : currentPage === 'signup' ? (
        <Signup 
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToCompanyName={() => setCurrentPage('companyname')}
          onBack={() => setCurrentPage('login')}
        />
      ) : (
        <CompanyName 
          onNavigateToProfile={() => setShowDashboard(true)}
          onBack={() => setCurrentPage('signup')}
        />
      )}
    </>
  )
}

export default Index


