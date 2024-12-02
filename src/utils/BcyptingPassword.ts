import * as bcrypt from 'bcrypt';
export async function  BcyptingPassword(password): Promise<string>{
    try{
    const SaltRound = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, SaltRound)
    return hashedpassword;
    }catch(e){
        console.log(e);
    }

}