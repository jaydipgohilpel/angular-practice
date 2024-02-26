import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './validation';
import * as moment from 'moment';

@Component({
  selector: 'app-reactive-form1',
  templateUrl: './reactive-form1.component.html',
  styleUrls: ['./reactive-form1.component.scss', './reactive-form1.scss']
})
export class ReactiveForm1Component implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted = false;
  ddjdj = ''
  isMinor = false;
  maxDate = moment(new Date()).format('YYYY-MM-DD')

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        userName: ['', [Validators.required, Validators.minLength(6),]],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        password: ['', [Validators.required, Validators.maxLength(10)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(10)],],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
        gender: ['', Validators.required,],
        acceptTerms: [false, Validators.requiredTrue],
        patentDetails: this.fb.array([])
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }


  get fullName() {
    return this.registrationForm.get('fullName');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  date() {
    const today = new Date();
    const dob = new Date(this.registrationForm.value.dob);

    const diffTime = Math.abs(today.getTime() - dob.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const diffDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));
    console.log(`${diffYears} years, ${diffMonths} months, and ${diffDays} days`);

    const deeyear = today.getFullYear();
    const rer = dob.getFullYear();
    console.log('2222', deeyear - rer);

    let d1 = moment(new Date(this.registrationForm.value.dob)).format('YYYY-MM-DD')
    let d2 = moment(new Date()).format('YYYY-MM-DD')
    let d3 = parseInt(d2) - parseInt(d1)
    console.log(d3);
    if (d3 >= 18) {
      this.isMinor = false
      this.patentDetails().clear();
    } else {
      this.isMinor = true;
      this.patentDetails().clear();
      this.addParentDetails(); // Clear the existing form array
    }
  }


  patentDetails(): FormArray {
    return this.registrationForm.get('patentDetails') as FormArray;
  }

  addParentDetails() {
    this.patentDetails().push(this.newParentDetails());
  }


  newParentDetails(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      adharNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(16), Validators.maxLength(16)]],
    });
    // skills: this.fb.array([])
  }

  removeParentDetails(empIndex: number) {
    this.patentDetails().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.patentDetails()
      .at(empIndex)
      .get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required],
      exp: ['', Validators.required]
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  control(key: string): FormControl {
    return this.registrationForm.get(key) as FormControl;
  }
  arrayControl(index: number, key: string): FormControl {
    return this.registrationForm.get(key) as FormControl;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.registrationForm.invalid) return;
    console.log(JSON.stringify(this.registrationForm.value, null, 2));
    let registration_data = [];
    let data = localStorage.getItem('registration_data');
    if (data)
      registration_data = JSON.parse(data);
    registration_data.push(this.registrationForm.value);
    localStorage.setItem('registration_data', JSON.stringify(registration_data))
    this.onReset()
  }

  onReset(): void {
    this.isSubmitted = false;
    this.registrationForm.reset();
  }

  todayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month: any = today.getMonth() + 1;
    let day: any = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  }


}
