import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment, EnrollmentSchema } from './schemas/enrollment.schema';
import { StudentsModule } from '../students/students.module';
import { CoursesModule } from '../courses/courses.module';
import { UserModule } from '../user/user.module';
import { PrerequisitesModule } from '../prerequisites/prerequisites.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
    StudentsModule,
    CoursesModule,
    UserModule,
    PrerequisitesModule,
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
