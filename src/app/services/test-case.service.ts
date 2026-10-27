import { Injectable } from '@angular/core';
import { TestCase } from '../models/test-case.model';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  private testCases: TestCase[] = [

    {
      id: 101,
      title: 'Verify valid user login',
      priority: 'High',
      status: 'Automated'
    },

    {
      id: 102,
      title: 'Verify invalid password',
      priority: 'High',
      status: 'Automated'
    },

    {
      id: 103,
      title: 'Verify Dashboard navigation',
      priority: 'Medium',
      status: 'Manual'
    }

  ];

  getTestCases(): TestCase[] {
    return this.testCases;
  }

  addTestCase(testCase: TestCase): void {
    this.testCases.push(testCase);
  }
}