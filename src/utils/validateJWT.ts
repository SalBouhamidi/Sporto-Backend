import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export  function validateJwt(token){
    let secretKey = process.env.JWT_SECRET
    let results =  jwt.verify(token, secretKey) as JwtPayload;
    return results
}