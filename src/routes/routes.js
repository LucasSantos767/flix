import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Movies from 'src/pages/Movies/index.vue'
import Usuarios from 'src/pages/Usuarios/index.vue'
import TableList from 'src/pages/Teatros/index.vue'
import RelatoriosComments from 'src/pages/Relatorios/Comments.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    name:'login',
    component: ()=> import('../pages/Login/Login.vue'),

  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/movies',
    children: [
      {
        path: 'movies',
        name: 'movies',
        component: Movies
      },
      {
        path: 'user',
        name: 'User',
        component: Usuarios
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: RelatoriosComments
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
