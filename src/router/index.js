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

import EdLevelslist from '../views/education_levels/EdLevelsListView'
import EdLevelsCreate from '../views/education_levels/EdLevelsCreateView'
import EdLevelsEdit from '../views/education_levels/EdLevelsEditView'

import TypeMalist from '../views/type_materials/TypeMaListView'
import TypeMaCreate from '../views/type_materials/TypeMaCreateView'
import TypeMaEdit from '../views/type_materials/TypeMaEditView'


import Materialslist from '../views/materials/MaterialsListView'
import MaterialsCreate from '../views/materials/MaterialsCreateView'
import MaterialsEdit from '../views/materials/MaterialsEditView'
import MaterialsDetail from '../views/materials/MaterialsDetailView'

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
  },


  //Education Levels
  {
    path: '/edlevels',
    name: 'edlevels',
    component: EdLevelslist
  },
  {
    path: '/edlevels/create',
    name: 'edlevelscreate',
    component:  EdLevelsCreate
  },
  {
    path: '/edlevels/edit/:id',
    name: 'edlevelsedit',
    component:  EdLevelsEdit
  },


  //Type materials
  {
    path: '/typematerials',
    name: 'typematerials',
    component: TypeMalist
  },
  {
    path: '/typematerials/create',
    name: 'typematerialscreate',
    component:  TypeMaCreate
  },
  {
    path: '/typematerials/edit/:id',
    name: 'typematerialsedit',
    component:  TypeMaEdit
  },


  //Materials
  {
    path: '/materials',
    name: 'materials',
    component: Materialslist
  },
  {
    path: '/materials/create',
    name: 'materialscreate',
    component:  MaterialsCreate
  },
  {
    path: '/materials/edit/:id',
    name: 'materialsedit',
    component:  MaterialsEdit
  },
  {
    path: '/materials/detail/:id',
    name: 'materialsdetail',
    component:  MaterialsDetail
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
