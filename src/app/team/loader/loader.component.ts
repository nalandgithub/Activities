import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {


  data: any;
  currentStage: any;
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private service: UserService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
  
  }

  navigateToNext() {
    debugger;
    const { activity_id, question_id, team_id, stage } = this.getStoredValues();
    const data = {
      activity_id,
      question_id,
      team_id,
      stage,
    };
    this.service.next(data).subscribe(
      (response) => {
        if (response.flag == 1 ) {



       if(stage != 1){
         this.currentStage = Number(localStorage.getItem('stage'));
        let newstage = this.currentStage + 1;

        let data: any = {
          'activity_code': localStorage.getItem('activity_code'),
          'team_name': localStorage.getItem('team_name'),
          'stage': newstage
        }
        localStorage.clear();
        this.service.getQuestion(data).subscribe(
          (result) => {
            if(result.status==true){
            localStorage.setItem('question', JSON.stringify(result));
            localStorage.setItem('stage', newstage);
           // localStorage.setItem('question',result.question[0]['question']);
            this.router.navigate(['/question']);
            this.toastr.success(result.msg);
           
            }
          },
          (error) => {
            console.error('Login failed', error);
            this.toastr.error(error.msg);
            // Handle login failure
          }
        );
       
       }
          this.service.getQuestion(data).subscribe(
            (result) => {
              localStorage.setItem('question', JSON.stringify(result));
              //this.currentStage = newstage;
              //  this.router.navigate(['/next_page']);

              this.router.navigate(['/question']);
              this.toastr.success(response.msg);
              localStorage.removeItem('question');
              localStorage.removeItem('stage');
              localStorage.removeItem('activity_code'); 
              
            });
        }
        if (response.flag == 2) {
          this.router.navigate(['/question']);
          this.toastr.error(response.msg);
        }
        if (response.status == 3) {
          this.toastr.info(response.msg);
        }
        else {
          this.toastr.info(response.msg);
        }
      },
      (error) => {
        debugger;
        console.error('Failed to submit answer', error);
        this.toastr.error(error.msg);
      }
    );
  }

  private getStoredValues() {
    debugger;
    const storedQuestionsString = localStorage.getItem('question');
    if (storedQuestionsString !== null) {
      const storedQuestions: any = JSON.parse(storedQuestionsString);
      console.log('Stored Questions:', storedQuestions);

      this.currentStage = Number(localStorage.getItem('stage'));
      let newstage = this.currentStage + 1;
      return {
        activity_id: storedQuestions.question[0].activity_id,
        question_id: Number(storedQuestions.question[0].id) + 1,
        team_id: storedQuestions.question[0].team_id,
        stage: newstage,

      };
    } else {
      console.error('No questions found in localStorage');
      this.toastr.error('No questions found in localStorage');
      return {}; // Return a default value or handle the error appropriately
    }
  }


  nextPage() {
debugger;
    const { activity_id, question_id, team_id, stage } = this.getStoredValues();
    const data = {
      activity_id,
      question_id,
      team_id,
      stage,
    };
    if (stage != 1) {
      this.service.next(data).subscribe(
        (response) => {
          if (response.status == true) {
            this.currentStage = Number(localStorage.getItem('stage'));
            let newstage = this.currentStage + 1;
            // if (response.question.length > currentStage) {
            //   currentStage++;
            // }
            let data: any = {
              'activity_code': localStorage.getItem('activity_code'),
              'question_id': localStorage.getItem('question_id'),
              'team_name': localStorage.getItem('team_name'),
              'stage': newstage
            }
            this.service.getQuestion(data).subscribe(
              (result) => {
                localStorage.setItem('question', JSON.stringify(result));
                this.currentStage = newstage;
                //  this.router.navigate(['/next_page']);

                this.router.navigate(['/question']);
                this.toastr.success(response.msg);
              });
          }
        });
    }
    else {

    }
  }
}
