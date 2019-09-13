import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MasterPage } from './pages/master/master.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'reset', loadChildren: () => import('./pages/reset/reset.module').then(m => m.ResetPageModule) },
  {
    path: '',
    component: MasterPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'contact-details/:contact',
        loadChildren: () => import('./pages/contact-details/contact-details.module').then(m => m.ContactDetailsPageModule)
      },
      {
        path: 'contact-editor/:contact',
        loadChildren: () => import('./pages/contact-editor/contact-editor.module').then(m => m.ContactEditorPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
