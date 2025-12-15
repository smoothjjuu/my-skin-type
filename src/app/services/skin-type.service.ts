import { Injectable, signal, computed } from '@angular/core';
import { SKIN_TYPE_RESULTS, SkinTypeData } from '../constants';

export type OptionValue = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Question {
    id: number;
    text: string;
    options: {
        label: string;
        value: OptionValue;
    }[];
}

// Re-export or alias for compatibility if needed, but better to use SkinTypeData
export type SkinTypeResult = SkinTypeData;

@Injectable({
    providedIn: 'root'
})
export class SkinTypeService {

    questions: Question[] = [
        {
            id: 1,
            text: 'How does your skin feel 30 minutes after washing your face?',
            options: [
                { label: 'Tight and dehydrated', value: 'A' },
                { label: 'Shine all over', value: 'B' },
                { label: 'Shiny only on forehead and nose', value: 'C' },
                { label: 'Comfortable, neither dry nor oily', value: 'D' },
                { label: 'Stinging, itching, or red', value: 'E' }
            ]
        },
        {
            id: 2,
            text: 'How often do you notice visible pores?',
            options: [
                { label: 'Almost never', value: 'A' },
                { label: 'All over my face', value: 'B' },
                { label: 'Only in the T-zone', value: 'C' },
                { label: 'Rarely', value: 'D' },
                { label: 'Hard to see, but skin looks irritated', value: 'E' }
            ]
        },
        {
            id: 3,
            text: 'How does your skin look by midday?',
            options: [
                { label: 'Dull or flaky', value: 'A' },
                { label: 'Greasy/Shiny all over', value: 'B' },
                { label: 'Shiny in T-zone, normal elsewhere', value: 'C' },
                { label: 'Fresh and clean', value: 'D' },
                { label: 'Red, blotchy, or irritated', value: 'E' }
            ]
        },
        {
            id: 4,
            text: 'How does your skin react to moisturizers?',
            options: [
                { label: 'Soaks it up immediately, needs more', value: 'A' },
                { label: 'Can feel heavy or greasy', value: 'B' },
                { label: 'Needs it on cheeks but T-zone is fine', value: 'C' },
                { label: 'Absorbs well, feels hydrated', value: 'D' },
                { label: 'Frequently burns, stings, or causes redness', value: 'E' }
            ]
        },
        {
            id: 5,
            text: 'How frequently do you get breakouts/acne?',
            options: [
                { label: 'Rarely or never', value: 'A' },
                { label: 'Often, all over the face', value: 'B' },
                { label: 'Occasionally, mostly in T-zone', value: 'C' },
                { label: 'Only hormonal or very rare', value: 'D' },
                { label: 'Prone to rashes or bumps from products', value: 'E' }
            ]
        },
        {
            id: 6,
            text: 'How does your makeup look after a few hours?',
            options: [
                { label: 'Cakey or flaky patches appear', value: 'A' },
                { label: 'Slips off or looks shiny everywhere', value: 'B' },
                { label: 'Shiny in the middle, fine on cheeks', value: 'C' },
                { label: 'Stays nicely put', value: 'D' },
                { label: 'Often feels itchy or uncomfortable', value: 'E' }
            ]
        },
        {
            id: 7,
            text: 'How does your skin react to sun exposure?',
            options: [
                { label: 'Burns easily, feels very dry afterwards', value: 'A' },
                { label: 'Tans easily, gets greasy', value: 'B' },
                { label: 'T-zone gets oily/sweaty first', value: 'C' },
                { label: 'Tans gradually, feels okay', value: 'D' },
                { label: 'Turns red immediately, feels hot/sensitive', value: 'E' }
            ]
        },
        {
            id: 8,
            text: 'Touch your cheeks. How do they feel?',
            options: [
                { label: 'Rough or thin', value: 'A' },
                { label: 'Smooth but oily', value: 'B' },
                { label: 'Smooth (but forehead is oily)', value: 'C' },
                { label: 'Soft and supple', value: 'D' },
                { label: 'Hot, irritated, or painful to touch', value: 'E' }
            ]
        }
    ];

    /* 
     * Signals for managing state 
     */
    private userAnswers = signal<Record<number, OptionValue>>({});

    setAnswer(questionId: number, value: OptionValue) {
        this.userAnswers.update(answers => ({ ...answers, [questionId]: value }));
    }

    getAnswer(questionId: number) {
        return this.userAnswers()[questionId];
    }

    resetQuiz() {
        this.userAnswers.set({});
    }

    calculateResult(): SkinTypeResult {
        const answers = Object.values(this.userAnswers());
        const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };

        answers.forEach(ans => {
            if (counts[ans] !== undefined) counts[ans]++;
        });

        // Scoring logic
        let type = 'Normal';
        const max = Math.max(counts.A, counts.B, counts.C, counts.D, counts.E);

        if (max === counts.E) type = 'Sensitive';
        else if (max === counts.A) type = 'Dry';
        else if (max === counts.B) type = 'Oily';
        else if (max === counts.C) type = 'Combination';
        else type = 'Normal';

        // Tie Breaker Priorities: Sensitive > Combination > Dry > Oily > Normal
        if (counts.E === max) type = 'Sensitive';
        else if (counts.C === max) type = 'Combination';
        else if (counts.A === max) type = 'Dry';
        else if (counts.B === max) type = 'Oily';
        else if (counts.D === max) type = 'Normal';

        return this.getResultDetails(type);
    }

    private getResultDetails(type: string): SkinTypeResult {
        return SKIN_TYPE_RESULTS[type] || SKIN_TYPE_RESULTS['Normal'];
    }
}
