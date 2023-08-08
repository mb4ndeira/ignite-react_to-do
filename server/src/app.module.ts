import { Module } from '@nestjs/common';

import { PrismaService } from './common/database/PrismaService';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
