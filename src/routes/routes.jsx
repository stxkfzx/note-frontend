import { lazy } from 'react'

export default [{
  path: '/',
  exact: true,
  component: lazy(() => import('../pages/HomePage/index'))
},
{
  path: '/auth',
  exact: true,
  component: lazy(() => import('../pages/AuthPage/index'))
},
  {
    path: '/register',
    exact: true,
    component: lazy(() => import('../pages/RegisterPage/index'))
  },
{
  path: '/edit',
  exact: true,
  component: lazy(() => import('../pages/EditPage/index'))
},
{
  path: '*',
  exact: true,
  component: lazy(() => import('../pages/404Page/index'))
}]
