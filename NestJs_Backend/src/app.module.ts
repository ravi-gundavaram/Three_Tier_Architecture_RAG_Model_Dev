import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule, // For making HTTP requests (used in DocumentsService)
    AuthModule, // Authentication-related functionality
    UsersModule, // User management functionality
    DocumentsModule, // Document management functionality
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
