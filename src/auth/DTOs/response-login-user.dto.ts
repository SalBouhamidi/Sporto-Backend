import { Expose, Exclude} from 'class-transformer';


@Exclude()
export class ResponseLoginUser {
    @Expose()
    id:string
    @Expose()
    name: string
    @Expose()
    email: string
    @Expose()
    token: string
    @Expose()
    message: string
}