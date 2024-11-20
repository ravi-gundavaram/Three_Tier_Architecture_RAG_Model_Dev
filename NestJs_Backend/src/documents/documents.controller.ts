import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('documents')
export class DocumentsController {
    @Post('upload')
    uploadDocument(@Body() body: { docId: string; content: string }) {
        return { message: 'Document uploaded', docId: body.docId };
    }

    @Get()
    getDocuments() {
        return { documents: ['doc1', 'doc2'] };
    }
}
