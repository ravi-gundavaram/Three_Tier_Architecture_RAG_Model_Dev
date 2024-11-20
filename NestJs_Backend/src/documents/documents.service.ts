import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentsService {
  private documents = []; // Mock in-memory storage for documents

  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves all documents from the storage.
   * @returns List of documents.
   */
  getAllDocuments(): any[] {
    return this.documents;
  }

  /**
   * Retrieves a document by its ID.
   * @param docId The ID of the document.
   * @returns The document object if found.
   */
  getDocumentById(docId: string): any {
    const document = this.documents.find((doc) => doc.id === docId);
    if (!document) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }
    return document;
  }

  /**
   * Creates a new document and stores it.
   * @param docId The unique ID of the document.
   * @param content The content of the document.
   * @returns The newly created document.
   */
  createDocument(docId: string, content: string): any {
    if (this.documents.find((doc) => doc.id === docId)) {
      throw new HttpException('Document ID already exists', HttpStatus.BAD_REQUEST);
    }

    const newDocument = { id: docId, content };
    this.documents.push(newDocument);
    return newDocument;
  }

  /**
   * Deletes a document by its ID.
   * @param docId The ID of the document to delete.
   * @returns A success message if deleted.
   */
  deleteDocument(docId: string): any {
    const index = this.documents.findIndex((doc) => doc.id === docId);
    if (index === -1) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    this.documents.splice(index, 1);
    return { message: 'Document deleted successfully' };
  }

  /**
   * Triggers ingestion for a specific document by communicating with the Python backend.
   * @param docId The ID of the document to ingest.
   * @returns The response from the Python backend.
   */
  async triggerIngestion(docId: string): Promise<any> {
    const document = this.getDocumentById(docId);
    const url = 'http://localhost:8000/ingest'; // Adjust to your Python backend URL

    const payload = {
      docId: document.id,
      content: document.content,
    };

    try {
      const response = await firstValueFrom(this.httpService.post(url, payload));
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to trigger ingestion: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
