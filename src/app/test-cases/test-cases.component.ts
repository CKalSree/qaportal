import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCaseService }
  from '../services/test-case.service';

import { TestCase }
  from '../models/test-case.model';

@Component({
  selector: 'app-test-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-cases.component.html'
})
export class TestCasesComponent implements OnInit {

  testCases: TestCase[] = [];

  constructor(
    private testCaseService: TestCaseService
  ) {}

  ngOnInit(): void {

    this.testCases =
      this.testCaseService.getTestCases();

  }

}