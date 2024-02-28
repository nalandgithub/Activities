import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: any;
  answerForm: FormGroup;
  showLoader: boolean = false;
  currentStage: any;


  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private toastr: ToastrService) {
    this.answerForm = this.fb.group({
      answer: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const storedQuestionsString = localStorage.getItem('question');
    if (storedQuestionsString !== null) {
      const storedQuestions: any = JSON.parse(storedQuestionsString);
      // this.question = storedQuestions.question;
      this.question = storedQuestions.question[0].question;
      //this.question = storedQuestionsString.replace(/^"(.*)"$/, '$1');  
    } else {
      console.error('No questions found in localStorage');
    }
  }

  submitAnswer() {
    if (this.answerForm.valid) {
      const { activity_id, question_id, team_id, stage } = this.getStoredValues();

      const answerData = {
        activity_id,
        question_id,
        team_id,
        stage,
        answer: this.answerForm.value.answer,
      };
      this.service.getAnswer(answerData).subscribe(
        (response) => {
          this.router.navigate(['/loader']);
          this.toastr.success(response.msg);
        },
        (error) => {
          this.toastr.error("Failed to submit answer", error);
        }
      );
    }
  }

  private getStoredValues() {
    const storedQuestionsString = localStorage.getItem('question');
    if (storedQuestionsString !== null) {
      const storedQuestions: any = JSON.parse(storedQuestionsString);
      console.log('Stored Questions:', storedQuestions);
      let currentStage = Number(localStorage.getItem('stage')); // Replace with your actual mechanism to track the stage
      if (storedQuestions.question.length > currentStage) {
        currentStage++;
      }
      return {
        activity_id: storedQuestions.question[0].activity_id,
        question_id: storedQuestions.question[0].question_id,
        team_id: storedQuestions.question[0].team_id,
        stage: currentStage,
      };
    } else {
      this.toastr.error("No questions found in localStorage");
      return {};
    }
  }


  nextPage() {
    const { activity_id, team_id, stage } = this.getStoredValues();
    const data = {
      activity_id,
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

