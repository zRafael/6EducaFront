import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByUser(this.idUser)

  }

  atualizar() {
    this.user.type = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      alert('A senhas estão incorretas.')
    } else {
        this.authService.editar(this.user).subscribe((resp: User) => {
          this.user = resp
      
     
        this.router.navigate(['/inicio'])
        alert('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value;
    //criando metodo para confirmar senha e quando colocar no formulario vai comparar senha
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
    //aqui guarda o tipo de usuario
  }
  

  findByUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.user = resp
    })
  }
}
