import { createRouter, createWebHistory } from 'vue-router'

import UserList from '../views/users/UserListView.vue'
import UserCreate from '../views/users/UserCreateView.vue'
import UserEdit from '../views/users/UserEditView.vue'

import AuthorList from '../views/authors/AuthorListView.vue'
import AuthorCreate from '../views/authors/AuthorCreateView.vue'
import AuthorEdit from '../views/authors/AuthorEditView.vue'



const routes = [
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
