import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { ProfileService } from '@services/profile/profile.service';
import { Profile } from '@services/profile/profile-interfaces';
import { UserProfile } from '@app/models/Profile';
import { CountryService } from '@services/countries/country.service';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  public userProfile: Profile;
  public form: FormGroup;
  public countries: Observable<string[]>;
  public minDate: Date;
  public maxDate: Date;
  public avatarPreview: string;
  private fileAvatar: File;
  private sub = new Subscription();

  constructor(
    private profileService: ProfileService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.sub.add(
      this.profileService.getProfile().subscribe(({avatar, ...userProfile}: Profile) => {
        if (avatar) this.avatarPreview = `${environment.url}/static/${avatar}`;
        this.userProfile = new UserProfile(userProfile);
        this.assignForm();
        this.assignDate();
      })
    );
    this.countries = this.countryService.getCountries();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  uploadAvatar(e) {
    if (e.target.files[0]) {
      this.avatarPreviewReader(e.target.files[0]);
    }
  }

  avatarPreviewReader(file: File) {
    const reader = new FileReader();
    this.fileAvatar = file;
    reader.addEventListener('load', (event: any) => {
      this.avatarPreview = event.target.result;
    });

    reader.readAsDataURL(file);
  }

  saveChanges() {
    if (this.form.valid) {
      if (this.fileAvatar) {
        this.sub.add(
          this.profileService.uploadAvatar(this.fileAvatar, this.form.value).subscribe(data => {
            if (data) this.snackBar.open('New profile saved', 'done', {duration: 2000});
          })
        );
      } else {
        this.sub.add(
          this.profileService.saveProfile(this.form.value, null).subscribe(data => {
            if (data) this.snackBar.open('New profile saved', 'done', {duration: 2000});
          })
        );
      }
    }
  }

  assignDate() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date();
  }

  assignForm() {

    this.form = this.formBuilder.group({
      username: [this.userProfile.username, [Validators.required]],
      birth: [this.userProfile.birth],
      country: [this.userProfile.country],
      telephone: [this.userProfile.telephone, [Validators.pattern('^[0-9]*$')]],
      description: [this.userProfile.description]
    });
  }
}
