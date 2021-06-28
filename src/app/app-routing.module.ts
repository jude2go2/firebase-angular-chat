import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { ChatroomContainerComponent } from './components/chatroom-container/chatroom-container.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatroomContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'chat/:roomname',
    component: ChatroomContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
