import { Outlet } from 'react-router-dom'
// import { Header } from '@/components/HeaderPrueba'

export function MainLayout () {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  )
}