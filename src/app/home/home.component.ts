import { Component, Inject } from '@angular/core';
import { SettingsComponent } from "../settings/settings.component";
import { FormsModule } from '@angular/forms';
import { RandomizerService } from '../randomizer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SettingsComponent,
    FormsModule,
    CommonModule 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [RandomizerService]
})
export class HomeComponent {
  public IsSettings: boolean = false;
  public Pairings: string[][] = [];

  constructor(@Inject(RandomizerService) private randomizerService: RandomizerService) {}

  toggleSettings(): void {
    this.IsSettings = !this.IsSettings;
  }

  randomize(): void {
    this.Pairings = this.randomizerService.randomize().sort((a, b) => a[0] < b[0] ? -1 : 1);
  }
}
