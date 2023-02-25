import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from './services/student.service';
import { Student } from './shared/models/student.model';
import swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  @ViewChild('myDrop', { static: false, read: NgbDropdown }) dropdown: NgbDropdown | undefined;

  title = 'modalVT';
  students: Student[] = [];
  selectedStudent: Student | null | undefined = null;

  skills = [
    {
      description: "M.4.1.5. Calcular la potencia de numeros enteros con exponentes naturales",
      CB1: false,
      CB2: false,
      CB3: false,
      CB4: false,
    },
    {
      description: "M.4.1.6. Calcular la potencia de numeros enteros con exponentes naturales positivos",
      CB1: false,
      CB2: false,
      CB3: false,
      CB4: false,
    },
  ]

  skillsAdded: any[] = []
  newSkill = {
    description: "", active: false,
    CB1: false,
    CB2: false,
    CB3: false,
    CB4: false,
  };

  strategyAdded: any[] = [];
  newStrategy = {
    description: "",
    addingStrategy: false,
    activity: []
  }

  newActivity: {
    name: string,
    enlaces: string[],
    addingActivity: boolean,
    finishActivity: boolean,
    files: any[]
  } = { name: "", files: [], enlaces: [], addingActivity: false, finishActivity: false }

  selectStrategyIndex = 0;

  newLink = "";
  newLinkEdition = "";
  editingActivity = false;

  constructor(
    private studentService: StudentService
  ) {

  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents()
      .subscribe(res => {
        let resp: any = res;
        this.students = resp.data;
      });
  }

  studentSelected(event: any) {
    let studentID = event.target.value;
    this.selectedStudent = this.students.find(student => {
      return student.idestudiante == studentID;
    })
  }

  getGrade(student: Student) {
    let grade: string;
    let textGrade = student.gradoadaptacioncurricular1;
    let aux: any;
    aux = textGrade.match(/\d/g);
    grade = aux.join("");
    return grade
  }

  skillSelected(event: any) {
    let skillTemp = {
      description: event.description,
      CB1: event.CB1,
      CB2: event.CB2,
      CB3: event.CB3,
      CB4: event.CB4,
      editable: false
    }
    this.skillsAdded.push(skillTemp);
    this.dropdown?.close();
  }

  addSkill() {
    this.newSkill.active = true;
  }

  createSkill() {
    let skillTemp = {
      description: this.newSkill.description,
      CB1: this.newSkill.CB1,
      CB2: this.newSkill.CB2,
      CB3: this.newSkill.CB3,
      CB4: this.newSkill.CB4,
      editable: false
    }
    this.skillsAdded.push(skillTemp);
    this.newSkill.active = false;
    this.newSkill.description = "";
    this.newSkill.CB1 = false;
    this.newSkill.CB2 = false;
    this.newSkill.CB3 = false;
    this.newSkill.CB4 = false;
  }

  cancelNewSkill() {
    this.newSkill.description = "";
    this.newSkill.CB1 = false;
    this.newSkill.CB2 = false;
    this.newSkill.CB3 = false;
    this.newSkill.CB4 = false;
    this.newSkill.active = false;
  }

  editSkill(index: number) {
    this.skillsAdded[index].editable = true;
  }

  deleteSkill(index: number) {
    this.skillsAdded.splice(index, 1);
  }

  updateSkill(index: number) {
    this.skillsAdded[index].editable = false;
  }

  cancelUpdateSkill(index: number) {
    this.skillsAdded[index].editable = false;
  }

  addStrategy() {
    this.newStrategy.addingStrategy = true;
  }

  createStrategy() {
    let strategyTemp = {
      description: this.newStrategy.description,
      activity: this.newStrategy.activity.slice(),
      editable: false
    }
    this.strategyAdded.push(strategyTemp);
    this.newStrategy.activity = [];
    this.newStrategy.description = "";
    this.newStrategy.addingStrategy = false;
  }

  cancelStrategy() {
    this.newStrategy.activity = [];
    this.newStrategy.description = "";
    this.newStrategy.addingStrategy = false;
  }

  editStrategy(index: number) {
    this.strategyAdded[index].editable = true;
  }

  updateStrategy(index: number) {
    this.strategyAdded[index].editable = false;
  }

  cancelUpdateStrategy(index: number) {
    this.strategyAdded[index].editable = false;
  }

  deleteStrategy(index: number) {
    this.strategyAdded.splice(index, 1);
  }

  addActivity(strategyID: number) {
    this.selectStrategyIndex = strategyID;
    this.newActivity.finishActivity = false;
    this.newActivity.addingActivity = true;
  }

  createActivity(strategyID: number) {
    let activityTemp = {
      name: this.newActivity.name,
      enlaces: this.newActivity.enlaces.slice(),
      files: this.newActivity.files.slice(),
      editable: false
    }

    this.strategyAdded[strategyID].activity.push(activityTemp);
    this.newActivity.name = "";
    this.newActivity.enlaces = []
    this.newActivity.files = [];
    this.newActivity.addingActivity = false;
    this.newActivity.finishActivity = true;
  }

  cancelActivity() {
    this.newActivity.name = "";
    this.newActivity.enlaces = []
    this.newActivity.files = [];
    this.newActivity.addingActivity = false;
  }

  addFileActivity(event: any) {
    const file: any | never = event.target.files[0];
    this.newActivity.files.push(file);
  }

  addFileEdition(event: any, strategyIndex: number, activityIndex: number) {
    const file: any | never = event.target.files[0];
    this.strategyAdded[strategyIndex].activity[activityIndex].files.push(file);
  }


  editActivity(strategyIndex: number, activityIndex: number) {
    this.strategyAdded[strategyIndex].activity[activityIndex].editable = true;
    this.editingActivity = true;
  }

  deleteActivity(strategyIndex: number, activityIndex: number) {
    this.strategyAdded[strategyIndex].activity.splice(activityIndex, 1);
  }

  updateActivity(strategyIndex: number, activityIndex: number) {
    this.strategyAdded[strategyIndex].activity[activityIndex].editable = false;
    this.editingActivity = false;
  }

  cancelUpdateActivity(strategyIndex: number, activityIndex: number) {
    this.strategyAdded[strategyIndex].activity[activityIndex].editable = false;
    this.editingActivity = false;
  }

  deleteFile(fileIndex: number) {
    this.newActivity.files.splice(fileIndex, 1);
  }

  deleteFileEdition(strategyIndex: number, activityIndex: number, fileIndex: number) {
    this.strategyAdded[strategyIndex].activity[activityIndex].files.splice(fileIndex, 1);
  }

  addLink() {
    this.newActivity.enlaces.push(this.newLink);
    this.newLink = "";
  }

  addLinkEdition(strategyIndex: number, activityIndex: number) {
    this.strategyAdded[strategyIndex].activity[activityIndex].enlaces.push(this.newLinkEdition);
    this.newLinkEdition = "";
  }

  deleteLink(linkIndex: number) {
    this.newActivity.enlaces.splice(linkIndex, 1);
  }

  deleteLinkEdition(strategyIndex: number, activityIndex: number, linkIndex: number) {
    this.strategyAdded[strategyIndex].activity[activityIndex].enlaces.splice(linkIndex, 1);
  }

  saveAll() {
    if (this.selectedStudent) {
      console.log('Estudiante: ', this.selectedStudent);
    } else {
      this.incomplete('Falta estudiante');
    }

    if (this.skillsAdded.length > 0) {
      console.log('Destrezas', this.skillsAdded);
    } else {
      this.incomplete('Falta destreza');
    }

    if (this.strategyAdded.length > 0) {
      console.log('Estrategias', this.strategyAdded);
    } else {
      this.incomplete('Falta estrategia');
    }

  }

  openModal(modalID: string) {
    let modal = document.querySelector('#' + modalID);
    if (modal)
      modal.classList.add('md-show');
  }

  closeModal(modalID: string) {
    let modal = document.querySelector('#' + modalID);
    if (modal)
      modal.classList.remove('md-show');
  }

  incomplete(errorDesc: string) {
    swal.fire(
      {
        title: 'Error en el formulario',
        text: errorDesc,
        icon: 'error',
        confirmButtonColor: '#016766',
      }
    )
  }
}
