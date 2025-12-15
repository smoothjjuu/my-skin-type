import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  constructor(private seoService: SeoService) {
    this.seoService.updateSeoData(
      'GlassSkin Guide - Discover Your Skin Type',
      'Take our personalized quiz to discover your skin type and get the perfect Korean glass skin routine.'
    );
  }
}
