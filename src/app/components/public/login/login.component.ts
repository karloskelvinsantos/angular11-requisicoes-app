import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logar(): void {
    try {
      if (this.email === undefined || this.senha === undefined) {
        this.mensagem = 'Usuário ou senha vazios';
        return;
      }

      this.authService.login(this.email, this.senha).then(() => {
        this.router.navigate(['/admin/painel']);
      }).catch(error => {
        let detalhes = '';
        switch (error.code) {
          case 'auth/user-not-found': {
            detalhes = 'Não existe usuário para o e-mail informado';
            break;
          }
          case 'auth/invalid-email': {
            detalhes = 'E-mail inválido';
            break;
          }
          case 'auth/wrong-password': {
            detalhes = 'Senha Inválida';
            break;
          }
          default: {
            detalhes = error.message;
            break;
          }
        }
        this.mensagem = `Erro ao logar. ${detalhes}`;
      });
    } catch (erro) {
      this.mensagem = `Erro ao logar. Detalhes: ${erro}`;
    }
  }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email',
    });

    if (email) {
      this.authService.resetPassword(email).then(() => {
        this.emailEnviado = true;
        this.mensagem = `Email enviado para ${email} com instrucões para recuperação.`;
      }).catch(error => {
        this.mensagem = `Erro ao localizar email. Detalhes ${error.message}`;
      });
    }
  }

}
