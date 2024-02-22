import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  teamId: any;
  activityId: any;
  userList: any;
  loginForm!: FormGroup
  data: any;


  constructor(public service: UserService, private router: Router,private toastr :ToastService) {
    this.loginForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
      activityId: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {

  }

  login() {
    debugger;
    if (this.loginForm.valid) {
      const { teamId, activityId } = this.loginForm.value;
      let data: any = {
        'activity_code': this.loginForm.value["activityId"],
        'team_name': this.loginForm.value["teamId"],
        'stage': 1
      }
      this.service.getQuestion(data).subscribe(
        (result) => {
          if(result.status==true){
            localStorage.setItem('question', JSON.stringify(result.question[0].question));
            localStorage.setItem('questions', JSON.stringify({activity_id: result.question[0].activity_id,
              team_id: result.question[0].team_id,stage: '1'
            }));
            localStorage.setItem('stage', '1');
          this.router.navigate(['/question']);
          this.toastr.success(result.msg);
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login failure
        }
      );
    }
  }

  // login() {
  //   debugger;
  //   if (this.loginForm.valid) {
  //     const { teamId, activityId } = this.loginForm.value;
      
  //     let data: any = {
  //       'activity_code': this.loginForm.value["activityId"],
  //       'team_name': this.loginForm.value["teamId"],
  //       'stage': 1
  //     }
  //     this.service.getQuestion(data).subscribe(
  //       (result) => {
  //        // if(result.status==true)
  //         {
  //         localStorage.setItem('question', JSON.stringify(result));
  //         localStorage.setItem('stage', "1");
  //        // localStorage.setItem('question',result.question[0]['question']);
  //         this.router.navigate(['/question']);
  //         this.toastr.success(result.msg);
  //         }
  //       },
  //       (error) => {
  //         console.error('Login failed', error);
  //         this.toastr.error(error.msg);
  //         // Handle login failure
  //       }
  //     );
  //   }
  // }
}
