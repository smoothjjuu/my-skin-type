import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SkinTypeService, SkinTypeResult } from '../services/skin-type.service';

@Component({
  selector: 'app-result',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent implements OnInit {
  private skinService = inject(SkinTypeService);
  private router = inject(Router);

  result = signal<SkinTypeResult | null>(null);
  showKoreanProducts = signal(false);

  ngOnInit() {
    this.result.set(this.skinService.calculateResult());
  }

  toggleProducts() {
    this.showKoreanProducts.update(v => !v);
  }

  shareResult() {
    const data = {
      title: 'My Skin Type Result',
      text: `I just found out I have ${this.result()?.type}! Take the quiz to find yours.`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(data).catch(err => console.log('Error sharing', err));
    } else {
      // Fallback for desktop: Copy to clipboard
      navigator.clipboard.writeText(`${data.text} ${data.url}`).then(() => {
        alert('Result copied to clipboard!');
      });
    }
  }
}
