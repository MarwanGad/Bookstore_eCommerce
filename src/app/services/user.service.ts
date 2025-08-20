import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Database, ref, set, object, update} from '@angular/fire/database';
import { from, map, Observable } from 'rxjs';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private injector = inject(EnvironmentInjector);

  constructor(private db: Database) {}

  addUser(userToAdd: UserInterface) {
    const usersRef = ref(this.db, `users/${userToAdd.id}`);
    return from(set(usersRef,userToAdd));
   
  }

  getUser(id: string): Observable<UserInterface | null> {
    const userRef = ref(this.db, `users/${id}`);
    return runInInjectionContext(this.injector, () =>
      object(userRef).pipe(
        map(snapshot => {
          console.log(snapshot.snapshot.val());
          if (!snapshot.snapshot.exists()) return null;
          return snapshot.snapshot.val() as UserInterface;
        })
      )
    );
  }

  updateUser(UserToUpdate: UserInterface, UserId: string){
    const userRef = ref(this.db, `users/${UserId}`);
    update(userRef,UserToUpdate);
  }
}
