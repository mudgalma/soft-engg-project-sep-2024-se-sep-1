import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminProjectStats from '../views/AdminProjectStats.vue'
import AdminProject from '../views/AdminProject.vue'
import Instructor from '../views/Instructor.vue'
import Student from '../views/Student.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register-instructor',
    name: 'register-instructor',
    component: Register
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard
  },
  {
    path: '/admin/stats',
    name: 'admin-project-stats',
    component: AdminProjectStats
  },
  {
    path: '/admin/projects',
    name: 'admin-project',
    component: AdminProject
  },
  {
    path: '/instructor/:type',
    name: 'instructor',
    component: Instructor
  },
  {
    path: '/student/:type/:id',
    name: 'student',
    component: Student
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const baseUrl = '/'

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

router.beforeEach((to, _from, next) => {
  const role = localStorage.getItem('role')
  const name = localStorage.getItem('username')
  const id = localStorage.getItem('id')

  if (
    (!role || !name || !id) &&
    to.name !== 'login' &&
    to.name !== 'register-instructor'
  ) {
    localStorage.clear()
    next({ name: 'login' })
    return
  }

  if (to.name === 'login' && role) {
    console.log('Redirecting to', role)
    next({ name: role })
    return
  }

  const path = to.name?.toString().split('-')[0] ?? ''

  if (path.includes('instructor') && role !== 'instructor') {
    if (role === 'student') {
      next({
        name: 'student',
        params: { type: 'dashboard', id: 0 }
      })
    } else {
      next({
        name: role === 'admin' ? 'admin' : 'login'
      })
    }
    return
  }

  if (path.includes('student') && role !== 'student') {
    if (role === 'instructor') {
      next({
        name: 'instructor',
        params: { type: 'dashboard' }
      })
    } else {
      next({
        name: role === 'admin' ? 'admin' : 'login'
      })
    }
    return
  }

  if (path.includes('admin') && role !== 'admin') {
    if (role === 'instructor') {
      next({
        name: 'instructor',
        params: { type: 'dashboard' }
      })
    } else {
      next({
        name: 'student',
        params: { type: 'dashboard', id: 0 }
      })
    }
    return
  }

  next()
})

export default router
