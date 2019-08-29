import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: 'page-login', pathMatch: 'full' },
            { path: 'page-login', component: PageLoginComponent, data: { title: 'Login :: Unique Accounting' } },
            { path: 'page-register/:token', component: PageRegisterComponent, data: { title: 'Register :: Unique Accounting' } },
            { path: 'page-forgot-password', component: PageForgotPasswordComponent, data: { title: 'Forgot Password :: Unique Accounting' } },
        ]
    }
];

export const routing = RouterModule.forChild(routes);