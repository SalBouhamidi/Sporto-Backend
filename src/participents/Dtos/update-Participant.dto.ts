import { PartialType } from '@nestjs/mapped-types';
import { addParticipentDtos } from './create-Participant.dto';

export class UpdateParticipantDtos extends PartialType(addParticipentDtos) {}