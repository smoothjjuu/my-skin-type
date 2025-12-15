import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { QuizComponent } from './quiz/quiz';
import { ResultComponent } from './result/result';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'result', component: ResultComponent },
    { path: '**', redirectTo: '' }
];
