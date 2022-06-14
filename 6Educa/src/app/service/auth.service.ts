import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://projetoseiseduca.herokuapp.com/usuarios/cadastrar', user)
  }

  entrar(userLgin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://projetoseiseduca.herokuapp.com/usuarios/logar', userLgin)
  }

  editar(user: User): Observable<User>{
    console.log(environment.token)
    return this.http.put<User>('https://projetoseiseduca.herokuapp.com/usuarios/atualizar', user, this.token)
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://projetoseiseduca.herokuapp.com/usuarios/${id}`, { headers: new HttpHeaders().set('Authorization', environment.token) })
  }

  logado() {
    let ok: boolean = false;

    if (environment.token != '') {
      ok = true
    }

    return ok
  }



}