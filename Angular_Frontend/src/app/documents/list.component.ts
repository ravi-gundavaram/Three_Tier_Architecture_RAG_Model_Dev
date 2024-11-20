import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../shared/services/documents.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  documents: any[] = []; // List of documents fetched from the backend
  loading: boolean = false; // Loading indicator
  error: string = ''; // Error message

  constructor(private documentsService: DocumentsService) {}

  /**
   * Fetch the list of documents on component initialization.
   */
  ngOnInit(): void {
    this.fetchDocuments();
  }

  /**
   * Fetches the list of documents from the backend.
   */
  fetchDocuments(): void {
    this.loading = true;
    this.error = '';

    this.documentsService.getDocuments().subscribe(
      (response) => {
        this.documents = response.documents; // Assuming response contains { documents: [] }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching documents:', error);
        this.error = 'Failed to fetch documents. Please try again later.';
        this.loading = false;
      }
    );
  }

  /**
   * Triggers the ingestion process for a selected document.
   * @param docId The ID of the document to ingest.
   */
  triggerIngestion(docId: string): void {
    this.documentsService.triggerIngestion(docId).subscribe(
      (response) => {
        alert(`Ingestion triggered for document ID: ${docId}`);
      },
      (error) => {
        console.error('Error triggering ingestion:', error);
        alert('Failed to trigger ingestion. Please try again.');
      }
    );
  }
}
