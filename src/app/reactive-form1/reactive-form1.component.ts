import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './validation';

@Component({
  selector: 'app-reactive-form1',
  templateUrl: './reactive-form1.component.html',
  styleUrls: ['./reactive-form1.component.scss', './reactive-form1.scss']
})
export class ReactiveForm1Component implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted = false;
  isRegistrationComplete = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),

          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ]
        ],
        confirmPassword: ['', [Validators.required,
        Validators.maxLength(10)],],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10),
        Validators.maxLength(10)]],
        gender: ['', Validators.required,],
        acceptTerms: [false, Validators.requiredTrue],
        employees: this.fb.array([])
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

  employees(): FormArray {
    return this.registrationForm.get('employees') as FormArray;
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }


  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([])
    });
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: ''
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

  onSubmit(): void {
    this.isSubmitted = true;
    // if (this.registrationForm.invalid) return;
    this.isRegistrationComplete = !this.isRegistrationComplete
    console.log(JSON.stringify(this.registrationForm.value, null, 2));
  }

  onReset(): void {
    this.isSubmitted = false;
    this.registrationForm.reset();
  }
}
