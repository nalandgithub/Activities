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

  ngOnInit() { }

  navigateToNext() {
    const { activity_id, question_id, team_id, stage } = this.getStoredValues();
    const data = {
      activity_id,
      question_id,
      team_id,
      stage,
    };
    this.service.next(data).subscribe(
      (response) => {
        if (response.complete != true) {

<<<<<<< HEAD
          if (response.flag == 1) {
            this.currentStage = Number(localStorage.getItem('stage'));
            let newstage = this.currentStage + 1;
            localStorage.removeItem('question');
            let data: any = {
              'activity_code': localStorage.getItem('activity_code'),
              'team_name': localStorage.getItem('team_name'),
              'stage': newstage
=======


      //  if(stage != 1){
      //    this.currentStage = Number(localStorage.getItem('stage'));
         let newstage = this.currentStage + 1;

        let data: any = {
          'activity_code': localStorage.getItem('activity_code'),
          'team_name': localStorage.getItem('team_name'),
          // 'stage': newstage
        }
//        localStorage.clear();
        this.service.getQuestion(data).subscribe(
          (result) => {
            if(result.status==true){
              localStorage.setItem('question', JSON.stringify(result.question[0].question));
              localStorage.setItem('question_id', (result.question[0].question_id));
              localStorage.setItem('stage', newstage);
            
           // localStorage.setItem('question',result.question[0]['question']);
            this.router.navigate(['/question']);
            this.toastr.success(result.msg);
           
>>>>>>> d4998a0c3344883026df223ffeef194c3b56c3b7
            }
            this.service.getQuestion(data).subscribe(
              (result) => {
                localStorage.setItem('question', JSON.stringify(result));
                localStorage.setItem('stage', newstage);
                this.router.navigate(['/question']);
                this.toastr.success(response.msg);
              },
              (error) => {
                console.error('Login failed', error);
                this.toastr.error(error.msg);
              }
            );
          }
          else if (response.flag == 2) {
            this.router.navigate(['/question']);
            this.toastr.error(response.msg);
          }
          else if (response.flag == 3) {
            this.toastr.info(response.msg);
          }
<<<<<<< HEAD
=======
        );
       
       
          // this.service.getQuestion(data).subscribe(
          //   (result) => {
          //     localStorage.setItem('question', JSON.stringify(result));
          //     //this.currentStage = newstage;
          //     //  this.router.navigate(['/next_page']);

          //     this.router.navigate(['/question']);
          //     this.toastr.success(response.msg);
          //     localStorage.removeItem('question');
          //     localStorage.removeItem('stage');
          //     localStorage.removeItem('activity_code'); 
              
          //   });
        }
        if (response.flag == 2) {
          this.router.navigate(['/question']);
          this.toastr.error(response.msg);
        }
        if (response.status == 3) {
          this.toastr.info(response.msg);
>>>>>>> d4998a0c3344883026df223ffeef194c3b56c3b7
        }
        else {
          localStorage.clear();
          this.router.navigate(['/complete']);
        }
      },
      (error) => {
        console.error('Failed to submit answer', error);
        this.toastr.error(error.msg);
      }
    );
  }

  private getStoredValues() {
    const storedQuestionsString = localStorage.getItem('question');
    if (storedQuestionsString !== null) {
      const storedQuestions: any = JSON.parse(storedQuestionsString);
      console.log('Stored Questions:', storedQuestions);
      this.currentStage = Number(localStorage.getItem('stage'));
<<<<<<< HEAD
      // if (this.currentStage !== 1 && storedQuestions.question.question_id == storedQuestionsString) {
      //   let newstage = this.currentStage + 1;
      //   return {
      //     activity_id: storedQuestions.question[0].activity_id,
      //     question_id:Number(storedQuestions.question[0].question_id)+2,
      //     team_id: storedQuestions.question[0].team_id,
      //     stage: newstage
      //   };
      // }
      // else{
      return {
        activity_id: storedQuestions.question[0].activity_id,
        question_id: storedQuestions.question[0].question_id,
        team_id: storedQuestions.question[0].team_id,
        stage: this.currentStage,
=======
      let newstage = this.currentStage;
      return {
        activity_id:localStorage.getItem('activity_id'),
        question_id: Number(localStorage.getItem('question_id')),
        team_id: localStorage.getItem('team_id'),
        stage: newstage,

>>>>>>> d4998a0c3344883026df223ffeef194c3b56c3b7
      };
      //  }
    } else {
      console.error('No questions found in localStorage');
      this.toastr.error('No questions found in localStorage');
<<<<<<< HEAD
      return {};
=======
      return {}; // Return a default value or handle the error appropriately
    }
  }


  nextPage() {
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
              'team_name': localStorage.getItem('team_id'),
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

>>>>>>> d4998a0c3344883026df223ffeef194c3b56c3b7
    }
  }
}
