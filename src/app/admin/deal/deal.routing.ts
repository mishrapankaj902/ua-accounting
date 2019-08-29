import { DealComponent } from './deal.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [   
    {
        path: '',
        component: DealComponent
    }
]


export const routing = RouterModule.forChild(routes);