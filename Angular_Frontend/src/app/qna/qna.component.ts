import { Component } from '@angular/core';
import { QnaService } from '../shared/services/qna.service';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css'],
})
export class QnaComponent {
  question: string = ''; // User input for the question
  answer: string = '';   // Response from the backend
  loading: boolean = false; // To show a loading indicator

  constructor(private qnaService: QnaService) {}

  /**
   * Handles the Q&A process by sending the user's question to the backend
   * and retrieving the answer.
   */
  askQuestion() {
    if (!this.question.trim()) {
      alert('Please enter a question!');
      return;
    }

    this.loading = true;
    this.qnaService.getAnswer(this.question).subscribe(
      (response) => {
        this.answer = response.answer; // Assuming the backend returns { answer: string }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching answer:', error);
        this.answer = 'Failed to fetch the answer. Please try again.';
        this.loading = false;
      }
    );
  }
}
