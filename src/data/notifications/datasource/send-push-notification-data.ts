// data/user-account/repositories/user-account-repository.ts
import { UserAccount } from '@data/user-account/models/user-account-model';


export interface NotificationDataSource{
    getLoggedInUsers(): Promise<any> 
}



export class NotificationDataSourceImpl implements NotificationDataSource {

    async getLoggedInUsers () {
        const loggedInUser = await  UserAccount.find({ isLogin: true });
         return loggedInUser.map((user) => user.toObject());
    }

//   async findLoggedInUsers() {
//     return UserAccount.find({ isLogin: true });
//   }
}

// export default new UserAccountRepository();
