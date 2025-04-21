
"use client"

import React from 'react'
import LandingPage from './Landingpage'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'

const page = () => {
  return (
    <div>
      <LandingPage />
      <div >
      <ExpenseForm />
      </div>
     
      <ExpenseList />
    </div>
  )
}

export default page
