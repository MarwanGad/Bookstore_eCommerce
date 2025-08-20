import { UserInterface } from '../models/user.interface';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,  signOut, user} from '@angular/fire/auth';
import { from, Observable, switchMap, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser;

  constructor(private auth: Auth, private db: UserService){
    this.currentUser = user(this.auth);
  }

  register(email: string,username: string,password: string, profilePicUrl: string){
    const promise = createUserWithEmailAndPassword(this.auth,email,password)
      .then(response => {
        const userToAdd:any = {
          username: username,
          email: response.user.email,
          id: response.user.uid,
          profilePicUrl: profilePicUrl,
        };
        this.db.addUser(userToAdd);
        updateProfile( response.user , { displayName: username, photoURL: profilePicUrl});
      })
      
      return from(promise);
    }

  login(
    email: string,
    passowrd: string,
    username?: string
  ){
    const promise = signInWithEmailAndPassword(
      this.auth,
      email,
      passowrd).then(userCredntial => {})

      return from(promise);
  }

  logout(){
    const promise = signOut(this.auth);
    return from(promise);
  }

  get appUser(): Observable<UserInterface | null>{
    return this.currentUser
      .pipe(
        switchMap( user => {
          if(user)
            return this.db.getUser(user!.uid);
          return of(null)
        })
      )
  }

}
