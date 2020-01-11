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
  selector: "app-banners",
  templateUrl: "./banners.component.html",
  styleUrls: ["./banners.component.scss"]
})
export class BannersComponent implements OnInit {
  @Input("banners") banners: Array<any> = [];

  zero: number;
  categoryArray: any;
  URL: string;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.zero = 0;
    this.URL = environment.apiUrl + "/category";
    this.getCategories();
  }

  private getCategories(): void {
    this.http.get(this.URL).subscribe((data: any) => {
      this.categoryArray = data.data;
    });
  }

  public getBanner(index) {
    return this.banners[index];
  }

  public getBgImage(index) {
    let bgImage = {
      "background-image":
        index != null
          ? "url(" + this.banners[index].image + ")"
          : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    return bgImage;
  }
}
