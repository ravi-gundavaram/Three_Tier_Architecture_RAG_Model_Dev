import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    username = '';
    password = '';

    constructor(private authService: AuthService) {}

    login() {
        this.authService.login(this.username, this.password).subscribe((response) => {
            console.log(response);
        });
    }
}
