import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
  list: any = []
  task: string = '';
  tarea_vacia: string = ''
  new_color = '';

  ngOnInit(): void {
    this.get_all_items();
  }

  add_item() {
    if (this.task.trim() != '') {
      let obj = {
        TaskName: this.task,
        IsComplete: false
      };
  
      this.list.push(obj);
      this.save_item();
      this.task = '';
      this.tarea_vacia = '¡Tarea agregada con éxito!'
      this.new_color = 'green'
    }else{
      this.tarea_vacia = '¡No se puede agregar una tarea vacia!'
      this.new_color = 'red'
    }

    setTimeout(() => {
      this.tarea_vacia = ''
    }, 2000);
  }

  tachar_tarea(index: number, currentValue: boolean) {
    if (this.list.length > index) {
      let obj = this.list[index];
      if (obj != null && typeof obj != "undefined") {
        obj.IsComplete = !currentValue;
        this.list[index] = obj;
        this.save_item();
      }
    }
  }
  delete_item(index: number) {
    if (this.list.length > index) {
      this.list.splice(index, 1);
      this.save_item();
    }
  }
  delete_all_items() {
    this.list = [];
    this.save_item();
  }
  
  save_item() {
    localStorage.setItem("todo", JSON.stringify(this.list));
  }

  get_all_items() {
    let value = localStorage.getItem("todo");
    if (value != '' && value != null && typeof value != "undefined") {
      this.list = JSON.parse(value!);
    }
  }

}
