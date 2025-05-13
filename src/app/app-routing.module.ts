import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'todo',
        loadComponent: () => import('./demo/pages/todo/todo.component').then((c) => c.TodoComponent),
        canActivate: [authGuard]
      },
      {
        path: 'calendar',
        loadComponent: () => import('./demo/pages/calendario/calendario.component').then((c) => c.CalendarioComponent),
        canActivate: [authGuard]
      },
      {
        path: 'sleepTrackers/historial',
        loadComponent: () => import('./demo/pages/sleepTracker/historial/historial.component').then((c) => c.HistorialComponent),
        canActivate: [authGuard]
      },
      {
        path: 'sleepTrackers/addRecord',
        loadComponent: () => import('./demo/pages/sleepTracker/registro-sleep/registro-sleep.component').then((c) => c.RegistroSleepComponent),
        canActivate: [authGuard]
      },
      {
        path: 'journal/historial',
        loadComponent: () => import('./demo/pages/journal/journal-historial/journal-historial.component').then((c) => c.JournalHistorialComponent),
        canActivate: [authGuard]
      },
      {
        path: 'journal/addRecord',
        loadComponent: () => import('./demo/pages/journal/new-journal-record/new-journal-record.component').then((c) => c.NewJournalRecordComponent),
        canActivate: [authGuard]
      },
      {
        path: 'perfil',
        loadComponent: () => import('./demo/pages/perfil/perfil.component').then((c) => c.PerfilComponent),
        canActivate: [authGuard]
      },
      {
        path: 'waterTracker/addRecord',
        loadComponent: () => import('./demo/pages/waterTracker/registro-water/registro-water.component').then((c) => c.RegistroWaterComponent),
        canActivate: [authGuard]
      },
      {
        path: 'waterTracker/historial',
        loadComponent: () => import('./demo/pages/waterTracker/historial/historial.component').then((c) => c.HistorialComponent),
        canActivate: [authGuard]
      },
      {
        path: 'moodWeekly',
        loadComponent: () => import('./demo/pages/mood-weekly-tracker/mood-weekly-tracker.component').then((c) => c.MoodWeeklyTrackerComponent),
        canActivate: [authGuard]
      },
      {
        path: 'moodMonthly',
        loadComponent: () => import('./demo/pages/mood-monthly-tracker/mood-monthly-tracker.component').then((c) => c.MoodMonthlyTrackerComponent),
        canActivate: [authGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
