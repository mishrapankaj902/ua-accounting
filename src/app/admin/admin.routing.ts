import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientChatsComponent } from './client-chats/client-chats.component';
import { ClientNotesComponent } from './client-notes/client-notes.component';
import { ProjectTimelineComponent } from './project-timeline/project-timeline.component';
import { PastProjectsComponent } from './past-projects/past-projects.component';
import { ClientTasksComponent } from './client-tasks/client-tasks.component';
import { ClientInvoiceComponent } from './client-invoice/client-invoice.component';
import { TaxesLetterPdfComponent } from './taxes-letter-pdf/taxes-letter-pdf.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                children: [
                    { path: '', redirectTo: 'index', pathMatch: 'full' },
                    { path: 'index', component: IndexComponent, data: { title: 'Dashboard :: Analytical :: Unique Accounting' } },
                ],
            },
            {
                path: 'client',
                component: ClientDashboardComponent,
                children: [
                    {
                        path: 'client-dashboard',
                        component: ClientDashboardComponent,
                        data: { title: 'UA Client' }
                    },
                    {
                        path: 'client-notes',
                        component: ClientNotesComponent,
                        data: { title: 'UA Project Timeline' }
                    },
                    {
                        path: 'client-chats',
                        component: ClientChatsComponent,
                        data: { title: 'UA Project Timeline' }
                    },
                    {
                        path: 'project-timeline',
                        component: ProjectTimelineComponent,
                        data: { title: 'UA Project Timeline' }
                    },
                    {
                        path: 'client-tasks',
                        component: ClientTasksComponent,
                        data: { title: 'UA Client Tasks' }
                    },
                    {
                        path: 'client-invoice',
                        component: ClientInvoiceComponent,
                        data: { title: 'UA Client Invoices' }
                    },
                    {
                        path: 'past-projects',
                        component: PastProjectsComponent,
                        data: { title: 'UA Past Projects' }
                    },
                    {
                        path: 'client-documents',
                        component: ClientDocumentsComponent,
                        data: { title: 'UA Client Documents'}
                    }
                ]
            },
            {
                path: 'calendar',
                component: CalendarComponent,
                data: { title: 'App :: Calendar :: Unique Accounting' }
            },

            {
                path: 'deal',
                loadChildren: './deal/deal.module#DealModule',
                data: { title: 'All Deals :: Unique Accounting' }
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                data: { title: 'Users :: Unique Accounting' }
            },
            {
                path: 'callback',
                loadChildren: './callback/callback.module#CallbackModule',
                data: { title: 'Callback :: Unique Accounting' }
            },


            {
                path: 'bookkeeping', component: TaxesLetterPdfComponent, data: { title: 'App :: bookkeeping' }
            },

        ]
    },

];

export const routing = RouterModule.forChild(routes);