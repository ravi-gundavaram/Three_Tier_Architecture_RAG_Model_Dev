import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private baseUrl = '/api/documents'; // Adjust this to match your backend API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Uploads a document to the backend.
   * @param docId The unique ID of the document.
   * @param content The content of the document.
   * @returns Observable with the upload response.
   */
  uploadDocument(docId: string, content: string): Observable<any> {
    const payload = { docId, content };
    return this.http.post(`${this.baseUrl}/upload`, payload);
  }

  /**
   * Fetches the list of all documents.
   * @returns Observable with the list of documents.
   */
  getDocuments(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  /**
   * Triggers the ingestion process for a document.
   * @param docId The unique ID of the document to ingest.
   * @returns Observable with the ingestion response.
   */
  triggerIngestion(docId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/ingest`, { docId });
  }
}
