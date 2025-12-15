import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { SkinTypeService, SkinTypeResult } from '../services/skin-type.service';

@Component({
  selector: 'app-result',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent implements OnInit {
  private skinService: SkinTypeService = inject(SkinTypeService);
  private router: Router = inject(Router);
  private seoService: SeoService = inject(SeoService);

  result = signal<SkinTypeResult | null>(null);
  showKoreanProducts = signal<boolean>(false);

  ngOnInit(): void {
    const resultData: SkinTypeResult = this.skinService.calculateResult();
    this.result.set(resultData);

    if (resultData) {
      this.seoService.updateSeoData(
        `Your Skin Type: ${resultData.type} - GlassSkin Guide`,
        `I found out I have ${resultData.type} skin type! Find your customized K-Beauty routine here.`
      );
    } else {
      this.seoService.updateSeoData(
        'Skin Type Result - GlassSkin Guide',
        'Your personalized skin type analysis and routine recommendations.'
      );
    }
  }

  toggleProducts(): void {
    this.showKoreanProducts.update(v => !v);
  }

  shareResult(): void {
    const data: { title: string; text: string; url: string } = {
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
