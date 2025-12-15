import { Component, OnInit, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { SkinTypeService, OptionValue } from '../services/skin-type.service';

@Component({
  selector: 'app-quiz',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnInit {
  private skinService = inject(SkinTypeService);
  private router = inject(Router);
  private seoService = inject(SeoService);

  questions = this.skinService.questions;
  totalQuestions = this.questions.length;
  currentQuestionIndex = signal(0);

  // Computed current question object
  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);

  // Computed progress
  progressPercentage = computed(() => {
    return ((this.currentQuestionIndex() + 1) / this.totalQuestions) * 100;
  });

  ngOnInit() {
    this.seoService.updateSeoData(
      'Skin Type Quiz - GlassSkin Guide',
      'Answer a few simple questions to find your skin type and get personalized product recommendations.'
    );
    this.skinService.resetQuiz();
  }

  isOptionSelected(qId: number, value: any): boolean {
    return this.skinService.getAnswer(qId) === value;
  }

  selectOption(qId: number, value: OptionValue) {
    this.skinService.setAnswer(qId, value);
  }

  canProceed(): boolean {
    const currentQId = this.currentQuestion().id;
    return !!this.skinService.getAnswer(currentQId);
  }

  nextQuestion() {
    if (this.currentQuestionIndex() < this.totalQuestions - 1) {
      this.currentQuestionIndex.update(i => i + 1);
    } else {
      this.finishQuiz();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(i => i - 1);
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex() === this.totalQuestions - 1;
  }

  finishQuiz() {
    this.router.navigate(['/result']);
  }
}
