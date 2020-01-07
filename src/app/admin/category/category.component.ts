import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  newCategoryForm: FormGroup;
  categoryArray: any;
  URL :string;
  constructor(public formBuilder: FormBuilder, public router: Router, public snackBar: MatSnackBar , private http: HttpClient ) { }

  ngOnInit() {
    this.URL=environment.apiUrl+'/category';
    this.tableFilling();
    this.newCategoryForm = this.formBuilder.group({
      'titleEnglish': ['', Validators.required],
      'titleArabic': ['', Validators.required],
      'descriptionEnglish' : ['', Validators.required],
      'descriptionArabic': ['', Validators.required]});
    }

    private tableFilling():void{
      this.http.get(this.URL)
      .subscribe((data) => {
         this.categoryArray = data
          console.log(data)});  
    }
  public onAddCategory(values: Object):void{
    this.http.post(this.URL, this.newCategoryForm.value).subscribe({
      next: response => { this.snackBar.open('New Category was Created Successfully!', 
                  '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });  
                  this.refresh(); 
                    },
      error: (response: HttpErrorResponse) => {
                    this.snackBar.open('Sorry , There wan an error while creating the new Category !', 
                  '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                  this.refresh(); 
              }
    });
    this.tableFilling();
  }
  public deleteCategory(category:any ):void{
    const params = new HttpParams().set('id', category.id);
    this.http.delete(this.URL+'/'+category.id).subscribe({
          next: response => { this.snackBar.open('Category was Deleted Successfully!', 
        '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });  
        this.refresh();  
      },
        error: (response: HttpErrorResponse) => {
          this.snackBar.open('Sorry , There wan an error while deleting the Category !', 
        '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        this.refresh(); 
        }
    });
    this.tableFilling();
  }
  private refresh(): void {
    window.location.reload();
}
}
