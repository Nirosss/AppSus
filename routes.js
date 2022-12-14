import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import notesIndex from './apps/keep/pages/note-index.cmp.js'
import noteDetails from './apps/keep/pages/note-details.cmp.js'
import mailIndex from './apps/mail/pages/mail-index.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import mailEdit from './apps/mail/pages/mail-edit.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: homePage,
    },
    {
      path: '/about',
      component: aboutPage,
    },
    {
      path: '/notes',
      component: notesIndex,
    },
    {
      path: '/notes/:id',
      component: noteDetails,
    },
    {
      path: '/mail',
      component: mailIndex,
    },
    {
      path: '/mail/edit',
      component: mailEdit,
    },
    {
      path: '/mail/edit/:id',
      component: mailEdit,
    },
    {
      path: '/mail/:id',
      component: mailDetails,
    },
  ],
}

export const router = createRouter(routerOptions)
