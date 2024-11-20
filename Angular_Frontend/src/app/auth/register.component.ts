import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = ''; // User's desired username
  password: string = ''; // User's password
  confirmPassword: string = ''; // Confirmed password
  loading: boolean = false; // Loading indicator
  message: string = ''; // Success or error message

  constructor(private authService: AuthService) {}

  /**
   * Handles user registration by sending the username and password to the backend.
   */
  register(): void {
    if (!this.username.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.message = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.message = '';

    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        this.message = 'Registration successful! Please log in.';
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.loading = false;
      },
      (error) => {
        console.error('Error during registration:', error);
        this.message = 'Failed to register. Please try again.';
        this.loading = false;
      }
    );
  }
}
