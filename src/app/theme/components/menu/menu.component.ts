import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  categoryArray: any;
  categoryTitle: [];
  URL: string;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.URL = environment.apiUrl + "/category";
    this.getCategories();
  }

  private getCategories(): void {
    this.http.get(this.URL).subscribe((data: any) => {
      this.categoryArray = data.data;
    });
  }

  goProducts(product: number) {
    this.router.navigate(["/products"], { queryParams: { id: product } });
  }

  openMegaMenu() {
    let pane = document.getElementsByClassName("cdk-overlay-pane");
    [].forEach.call(pane, function(el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains("mega-menu")) {
          el.classList.add("mega-menu-pane");
        }
      }
    });
  }
}
