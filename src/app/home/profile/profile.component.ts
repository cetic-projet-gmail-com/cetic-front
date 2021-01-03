import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiHomeService } from 'src/app/core/services/api/api-home.service';

import { Profile } from 'src/app/core/models/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiHomeService) {}

  formProfile = this.fb.group({
    id: [],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });

  formState = {
    isLoading: false,
    isEditable: false,
    isError: false,
    Errors: [],
  };

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.formProfile.disable();

    this.api.getProfile().subscribe(
      (profile: any) => {
        const { id, firstName, lastName, email } = profile;
        this.formProfile.setValue({ id, firstName, lastName, email });
      },
      (error) => {}
    );
  }

  handleEdit() {
    this.formProfile.enable();
    this.formState.isEditable = true;
  }

  handleSubmit() {
    if (!this.formProfile.valid) return;
    try {
      this.formState.isLoading = true;
      this.formState.isEditable = false;
      this.api.updateProfile(this.formProfile.value);
    } catch (error) {
      this.formState.isError = true;
    } finally {
      this.formState.isLoading = false;
      this.formState.isEditable = true;
    }
  }
}
