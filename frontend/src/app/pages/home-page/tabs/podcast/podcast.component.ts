import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { Observable, take } from "rxjs";
import { PodcastService } from "src/app/services/podcast.service";
import { MaterialModule } from "src/material.module"
import { Podcast } from "../../../../../../../shared/interfaces/podcast.interface";
import { PdfService } from "src/app/services/pdf.service";

@Component({
    selector: 'podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss'],
    standalone: true,
    imports: [CommonModule, MaterialModule, FlexLayoutModule],
  })
  export class PodcastComponent implements OnInit {
    gridColumns = 3;
    $podcasts!: Observable<Podcast[]>
    constructor(private podcastService: PodcastService, private pdfService: PdfService){

    }

    ngOnInit(): void {
        this.$podcasts = this.podcastService.getPodcasts()
    }

    downloadPdf() {
      this.pdfService.getPdf().pipe(take(1)).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Open the PDF in a new tab
      });
    }
  }