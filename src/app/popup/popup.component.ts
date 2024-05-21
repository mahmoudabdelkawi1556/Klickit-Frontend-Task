import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Cat } from '../interfaces/cat';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdService } from '../prod.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() role: string = '';
  @Output() exit: EventEmitter<boolean> = new EventEmitter<boolean>();
  categories!: Cat[];
  addProduct: FormGroup;
  addCategory: FormGroup;

  constructor(private _cat: CategoriesService, private _toast: ToastrService, private _fb: FormBuilder, private _prod: ProdService,) {
    this.addProduct = this._fb.group({
      Name: [''],
      Description: [''],
      Price: [''],
      CategoryId: [''],
      Image: [null],
      Quantity: [''],
    });
    this.addCategory = this._fb.group({
      Name: [''],
      Description: ['']
    })
  }


  ngOnInit(): void {
    this.getCategories();
  }


  close() {
    this.exit.emit(false);
  }

  getCategories() {
    this._cat.getCat().subscribe({
      next: (resp) => {
        this.categories = resp.data;
      },
      error: (err) => {
        this._toast.error(err.error.Message);
      }
    })
  }

  onFileChange(event: any): void {
    this.addProduct.patchValue({
      Image: event.target.files[0]
    })
  }

  createFormData(formGroup: FormGroup) {
    let formData = new FormData();
    Object.entries(formGroup.value).forEach(
      ([key, value]: any) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
    );
    return formData;
  }

  submitForm(form: FormGroup) {
    if (this.role == 'User') {
      this._prod.addProduct(this.createFormData(form)).subscribe({
        next: (resp) => {
          this._toast.success(resp.message);
          this.close();
          form.reset();
        },
        error: (err) => {
          // this._toast.error(err.error.Message);
        }
      })
    }
    else {
      this._cat.addCat(form.value).subscribe({
        next: (resp) => {
          this._toast.success(resp.message);
          this.close();
          form.reset();
        },
        error: (err) => {
          // this._toast.error(err.error.Message);
        }
      })
    }
  }


}
