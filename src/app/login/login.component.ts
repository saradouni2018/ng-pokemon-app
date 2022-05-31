import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  message: string = "vous êtes déconnecté.(pikachu/pikachu)";
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "Vous êtes connecté";
    } else {
      this.message = "Indentifiant ou mot de passe incorrect.";
    }
  }
  login() {
    this.message = "Tantative de connecxion en cours....";
    this.auth
      .login(this.name, this.password)
      .subscribe((isLoggedIn: Boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.router.navigate(["/pokemons"]);
        } else {
          this.password = "";
          this.router.navigate(["/login"]);
        }
      });
  }
  logout() {
    this.auth.logout();
    this.message = "Vous êtes déconnecté";
  }
}
