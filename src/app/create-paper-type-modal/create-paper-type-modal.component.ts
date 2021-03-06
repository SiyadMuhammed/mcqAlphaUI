import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PaperTypeService } from '../services/paper-type-service';

@Component({
  selector: 'app-create-paper-type-modal',
  templateUrl: './create-paper-type-modal.component.html',
  styleUrls: ['./create-paper-type-modal.component.css']
})
export class CreatePaperTypeModalComponent implements OnInit {

  private formSubmitAttempt: boolean;
  form;

  constructor(public bsModalRef: BsModalRef,
              private formBuilder: FormBuilder,
              private paperTypeService: PaperTypeService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])]
      });
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }

  onSubmit(): void {
    const self = this;
    self.formSubmitAttempt = true;
    if (self.form.valid) {
      const category = self.form.value;
      self.paperTypeService.create(category.name).subscribe(() => {
        self.bsModalRef.hide();
      });
    }
  }

}
