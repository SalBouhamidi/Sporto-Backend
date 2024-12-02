import { Expose, Exclude} from 'class-transformer';


@Exclude()
export class ResponseUser {
    @Expose()
    name: string
    @Expose()
    email: string
    @Expose()
    organisationName: string
}