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

  constructor(public service: UserService, private router: Router, private toastr: ToastService) {
    this.loginForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
      activityId: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid) {
      const { teamId, activityId } = this.loginForm.value;
      let data: any = {
        'activity_code': this.loginForm.value["activityId"],
        'team_name': this.loginForm.value["teamId"],
        // 'stage': 1
      }
      this.service.getQuestion(data).subscribe(
        (result) => {
<<<<<<< HEAD
          if (result.status == true) {
            localStorage.setItem('question', JSON.stringify(result));
            // localStorage.setItem('question', JSON.stringify(result.question[0].question));
            // localStorage.setItem('questions', JSON.stringify({activity_id: result.question[0].activity_id,
            //   team_id: result.question[0].team_id,stage: '1'
            // }));
            localStorage.setItem('stage', '1');
            localStorage.setItem('team_name', teamId);
            localStorage.setItem('activity_code', activityId);
            this.router.navigate(['/question']);
            this.toastr.success(result.msg);
=======
          if(result.status==true){
            localStorage.setItem('question', JSON.stringify(result.question[0].question));
            localStorage.setItem('activity_id', result.question[0].activity_id);
            localStorage.setItem('team_id', result.question[0].team_id);
            localStorage.setItem('team_name', result.question[0].team_code);
            localStorage.setItem('stage', result.stage);
            localStorage.setItem('question_id', result.question[0].question_id);
            localStorage.setItem('activity_code',result.question[0].activity_code);
            
            // localStorage.setItem('otherDetails', JSON.stringify({activity_id: result.question[0].activity_id,
            //   team_id: result.question[0].team_id,stage: '1'
            // }));
          //  localStorage.setItem('stage', '1');
          this.router.navigate(['/question']);
          this.toastr.success(result.msg);
>>>>>>> d4998a0c3344883026df223ffeef194c3b56c3b7
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
