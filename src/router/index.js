import { createRouter, createWebHistory } from 'vue-router'

import UserList from '../views/users/UserListView'
import UserCreate from '../views/users/UserCreateView'
import UserEdit from '../views/users/UserEditView'

import AuthorList from '../views/authors/AuthorListView'
import AuthorCreate from '../views/authors/AuthorCreateView'
import AuthorEdit from '../views/authors/AuthorEditView'

import EditorialList from '../views/editorials/EditorialListView'
import EditorialCreate from '../views/editorials/EditorialCreateView'
import EditorialEdit from '../views/editorials/EditorialEditView'

import LoginView from '../views/auth/LoginView'

import HomeView from '../views/home/HomeView'



const routes = [
  // {
  //   path: '*',
  //   redirect: '/login'
  // },
  //0
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  //Login
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  //autores
  {
    path: '/editorials',
    name: 'editorials',
    component: EditorialList
  },
  {
    path: '/editorials/create',
    name: 'editorialcreate',
    component:  EditorialCreate
  },
  {
    path: '/editorials/edit/:id',
    name: 'editorialedit',
    component:  EditorialEdit
  },

  //autores
  {
    path: '/authors',
    name: 'authors',
    component: AuthorList
  },
  {
    path: '/authors/create',
    name: 'authorcreate',
    component:  AuthorCreate
  },
  {
    path: '/authors/edit/:id',
    name: 'authoredit',
    component:  AuthorEdit
  },

  //users
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  {
    path: '/users/create',
    name: 'usercreate',
    component:  UserCreate
  },
  {
    path: '/users/edit/:id',
    name: 'useredit',
    component:  UserEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
