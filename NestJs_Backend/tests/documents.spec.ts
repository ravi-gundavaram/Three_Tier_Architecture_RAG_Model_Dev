import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from '../src/documents/documents.service';
import { DocumentsController } from '../src/documents/documents.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('DocumentsService', () => {
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [DocumentsService],
    }).compile();

    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(documentsService).toBeDefined();
  });

  it('should create a document', () => {
    const newDocument = documentsService.createDocument('doc1', 'Sample Content');
    expect(newDocument).toEqual({ id: 'doc1', content: 'Sample Content' });
  });

  it('should throw an error if document ID already exists', () => {
    documentsService.createDocument('doc1', 'Sample Content');
    expect(() => documentsService.createDocument('doc1', 'Another Content')).toThrow(
      new HttpException('Document ID already exists', HttpStatus.BAD_REQUEST),
    );
  });

  it('should fetch all documents', () => {
    documentsService.createDocument('doc1', 'Sample Content');
    documentsService.createDocument('doc2', 'Another Content');

    const allDocuments = documentsService.getAllDocuments();
    expect(allDocuments).toHaveLength(2);
    expect(allDocuments).toEqual([
      { id: 'doc1', content: 'Sample Content' },
      { id: 'doc2', content: 'Another Content' },
    ]);
  });

  it('should fetch a document by ID', () => {
    documentsService.createDocument('doc1', 'Sample Content');
    const document = documentsService.getDocumentById('doc1');
    expect(document).toEqual({ id: 'doc1', content: 'Sample Content' });
  });

  it('should throw an error if document is not found by ID', () => {
    expect(() => documentsService.getDocumentById('nonexistent')).toThrow(
      new HttpException('Document not found', HttpStatus.NOT_FOUND),
    );
  });

  it('should delete a document by ID', () => {
    documentsService.createDocument('doc1', 'Sample Content');
    const response = documentsService.deleteDocument('doc1');
    expect(response).toEqual({ message: 'Document deleted successfully' });

    const allDocuments = documentsService.getAllDocuments();
    expect(allDocuments).toHaveLength(0);
  });

  it('should throw an error when deleting a nonexistent document', () => {
    expect(() => documentsService.deleteDocument('nonexistent')).toThrow(
      new HttpException('Document not found', HttpStatus.NOT_FOUND),
    );
  });
});

describe('DocumentsController', () => {
  let documentsController: DocumentsController;
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [DocumentsController],
      providers: [DocumentsService],
    }).compile();

    documentsController = module.get<DocumentsController>(DocumentsController);
    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  it('should fetch all documents via controller', () => {
    jest.spyOn(documentsService, 'getAllDocuments').mockReturnValue([
      { id: 'doc1', content: 'Sample Content' },
    ]);

    const result = documentsController.getAllDocuments();
    expect(result).toEqual([{ id: 'doc1', content: 'Sample Content' }]);
  });

  it('should fetch a document by ID via controller', () => {
    jest.spyOn(documentsService, 'getDocumentById').mockReturnValue({
      id: 'doc1',
      content: 'Sample Content',
    });

    const result = documentsController.getDocumentById('doc1');
    expect(result).toEqual({ id: 'doc1', content: 'Sample Content' });
  });

  it('should create a document via controller', () => {
    jest.spyOn(documentsService, 'createDocument').mockReturnValue({
      id: 'doc1',
      content: 'Sample Content',
    });

    const result = documentsController.createDocument({
      docId: 'doc1',
      content: 'Sample Content',
    });

    expect(result).toEqual({ id: 'doc1', content: 'Sample Content' });
  });

  it('should delete a document via controller', () => {
    jest.spyOn(documentsService, 'deleteDocument').mockReturnValue({
      message: 'Document deleted successfully',
    });

    const result = documentsController.deleteDocument('doc1');
    expect(result).toEqual({ message: 'Document deleted successfully' });
  });

  it('should trigger ingestion via controller', async () => {
    jest.spyOn(documentsService, 'triggerIngestion').mockResolvedValue({
      message: 'Ingestion triggered successfully',
    });

    const result = await documentsController.triggerIngestion('doc1');
    expect(result).toEqual({ message: 'Ingestion triggered successfully' });
  });
});
