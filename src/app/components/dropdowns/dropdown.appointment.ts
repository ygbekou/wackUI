import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Appointment } from '../../models/appointment';
 
@Injectable()
export class AppointmentDropdown {
  
  filteredAppointments : Appointment[];
  appointments : Appointment[] = [];
  patientId: number; 
  
  constructor(
    private genericService: GenericService) {
    //this.getAllAppointments();
  }
  
  filter(event) {
    this.filteredAppointments = DropdownUtil.filter(event, this.appointments);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredAppointments = this.appointments;
    }, 10)
  }
  
  public getAllAppointments(): void {
    let parameters: string [] = []; 
            
    parameters.push('e.patient.id = |patientId|' + this.patientId + '|Long')
    
    this.genericService.getAllByCriteria('Appointment', parameters)
      .subscribe((data: any[]) => {
        this.appointments = data
        
      },
        
      error => console.log(error),
      () => console.log('Get All Appointments Complete'));
  }
  
}