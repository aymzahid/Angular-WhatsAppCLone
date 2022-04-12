import { RegFormServiceService } from './../reg-form-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegForm: any;
  fileImage: any;

  ngOnInit(): void {
    this.RegForm = FormGroup;
    this.RegForm = this.fb.group({
      name: [''],
      mobile: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9.@]*'),
        ],
      ],
      password: [''],
      image: [''],
    });
  }
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private RegFormService: RegFormServiceService
  ) {}
  LoadImage(event: any) {
    if (event.target.files.length > 0) {
      this.fileImage = <File>event.target.files[0];
      this.RegForm.get('image').setValue(this.fileImage);
    }
  }

  onSubmit() {
    console.log('form sending', this.RegForm.value);

    const formdata = new FormData();
    formdata.append('name', this.RegForm.get('name').value);
    formdata.append('mobile', this.RegForm.get('mobile').value);
    formdata.append('email', this.RegForm.get('email').value);
    formdata.append('password', this.RegForm.get('password').value);
    formdata.append('image', this.RegForm.get('image').value);
    // formdata.append('image', this.fileImage);

    this.RegFormService.saveformData(formdata).subscribe((res) => {
      let responseData = JSON.stringify(res.users);
      localStorage.setItem('users', JSON.stringify(res['users']));
    });
  }
}
