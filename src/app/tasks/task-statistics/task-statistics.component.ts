import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TaskService } from 'src/app/_services/task.service';
import { TaskStatus } from 'src/app/_models/enums';
import { Task } from 'src/app/_models/Task';

@Component({
  selector: 'app-task-statistics',
  templateUrl: './task-statistics.component.html',
  styleUrls: ['./task-statistics.component.css']
})
export class TaskStatisticsComponent implements OnInit {
  barChart = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.taskService.getTasks().subscribe(tasks => {
      const flatTasks = this.flattenDeep(tasks);
      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: ['Not Started', 'Started', 'Completed', 'In Hiatus'],
          datasets: [
            {
              label: '# of Tasks',
              data: [
                flatTasks.filter(t => t.status === TaskStatus.NotStarted)
                  .length,
                flatTasks.filter(t => t.status === TaskStatus.Started).length,
                flatTasks.filter(t => t.status === TaskStatus.Completed).length,
                flatTasks.filter(t => t.status === TaskStatus.InHiatus).length
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1
                }
              }
            ]
          }
        }
      });
    });
  }

  private flattenDeep(arr1: Task[]) {
    return arr1.reduce(
      (acc, val) =>
        Array.isArray(val.subtasks)
          ? acc.concat(val).concat(this.flattenDeep(val.subtasks))
          : acc.concat(val),
      []
    );
  }
}
