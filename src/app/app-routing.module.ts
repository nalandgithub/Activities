import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './team/login/login.component';
import { QuestionComponent } from './team/question/question.component';
import { LoaderComponent } from './team/loader/loader.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'loader', component: LoaderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
