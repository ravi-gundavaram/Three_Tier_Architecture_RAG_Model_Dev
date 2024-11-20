import { Component } from '@angular/core';
import { DocumentsService } from '../shared/services/documents.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  docId: string = ''; // Document ID input by the user
  content: string = ''; // Document content input by the user
  loading: boolean = false; // Loading indicator for the upload process
  message: string = ''; // Success or error message

  constructor(private documentsService: DocumentsService) {}

  /**
   * Handles document upload by sending the docId and content to the backend.
   */
  uploadDocument(): void {
    if (!this.docId.trim() || !this.content.trim()) {
      this.message = 'Please provide both Document ID and content.';
      return;
    }

    this.loading = true;
    this.message = '';

    this.documentsService.uploadDocument(this.docId, this.content).subscribe(
      (response) => {
        this.message = `Document uploaded successfully with ID: ${this.docId}`;
        this.docId = '';
        this.content = '';
        this.loading = false;
      },
      (error) => {
        console.error('Error uploading document:', error);
        this.message = 'Failed to upload the document. Please try again.';
        this.loading = false;
      }
    );
  }
}
