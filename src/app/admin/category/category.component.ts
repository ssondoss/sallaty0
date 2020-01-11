import { Component, OnInit } from "@angular/core";
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
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  newCategoryForm: FormGroup;
  categoryArray: any;
  URL: string;
  publicURL: string;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.publicURL = environment.apiUrl;
    this.URL = environment.apiUrl + "/category";
    this.getCategories();
    this.newCategoryForm = this.formBuilder.group({
      titleEnglish: ["", Validators.required],
      titleArabic: ["", Validators.required],
      descriptionEnglish: ["", Validators.required],
      descriptionArabic: ["", Validators.required],
      imageId: []
    });
  }

  private getCategories(): void {
    this.http.get(this.URL).subscribe((data: any) => {
      this.categoryArray = data.data;
    });
  }
  public onAddCategory(values: Object): void {
    console.log(this.newCategoryForm.value);
    this.http.post(this.URL, this.newCategoryForm.value).subscribe({
      next: response => {
        this.snackBar.open("New Category was Created Successfully!", "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 3000
        });
        this.refresh();
      },
      error: (response: HttpErrorResponse) => {
        this.snackBar.open(
          "Sorry , There wan an error while creating the new Category !",
          "×",
          { panelClass: "error", verticalPosition: "top", duration: 3000 }
        );
        this.refresh();
      }
    });
    this.getCategories();
  }
  public deleteCategory(category: any): void {
    const params = new HttpParams().set("id", category.id);
    this.http.delete(this.URL + "/" + category.id).subscribe({
      next: response => {
        this.snackBar.open("Category was Deleted Successfully!", "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 3000
        });
        this.refresh();
      },
      error: (response: HttpErrorResponse) => {
        this.snackBar.open(
          "Sorry , There wan an error while deleting the Category !",
          "×",
          { panelClass: "error", verticalPosition: "top", duration: 3000 }
        );
        this.refresh();
      }
    });
    this.getCategories();
  }
  private refresh(): void {
    window.location.reload();
  }

  unploadImage(event: any) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    this.http
      .post<any>(environment.apiUrl + "/uploadImage", formData)
      .subscribe(
        res => this.newCategoryForm.get("imageId").setValue(res.imageId),
        err => console.log(err)
      );
  }
}
