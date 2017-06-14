import { Router } from '@angular/router';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { Client } from '../../../interfaces/client';
import { CompleteUser } from '../../../interfaces/complete.user';

import { UserService } from '../../../services/user.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
declare var jQuery:any;

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile.modal.html',
})

export class ProfileModal implements OnInit {

    clients: Client;
    userForm: FormGroup;
    registerForm: FormGroup;
    error: String;
    userStorage: Subscription;
    userData:CompleteUser;
  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private userService: UserService, 
    private store: Store<CompleteUser>) {}

  ngOnInit() {
     this.userForm = this.fb.group({
      id:[''],
      userId:[''],
      isData:[''],
      created_at:[''],
      updated_at:[''],
      deleted_at:[''],
      name: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(30)]],
      fantasyName: ['', [Validators.required,Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      place: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      codigoPostal: ['', [Validators.minLength(4),Validators.maxLength(30)]],
      codigoProvincia: ['', [Validators.minLength(4),Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      telephone: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      cuit: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      web: ['', [Validators.minLength(6),Validators.maxLength(30)]],
      iib: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      pib: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      epib: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      ivaInscripto: ['', []],
      precioLista: ['', [Validators.required]],
      condicionDeVenta: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      limiteDeCredito: ['', [Validators.required]],
      numeroDeInscripcionesIB: ['', [Validators.required]],
      cuentasGenerales: ['', [Validators.required, Validators.minLength(6)]],
      percepcionDeGanancia: ['', [Validators.required]],           
    });
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
      password: ['', [Validators.minLength(6),Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
      lastname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required]],
      sales: [''],
      stock: [''],
      clients: [''],
      providers: [''],
    });
    this.userStorage = this.userService.getUserStorage().subscribe(state => {
      this.userData = state;
      if(state){
        this.userData.profile.password = null;
        this.registerForm.setValue(this.userData.profile);
        this.userForm.setValue(this.userData.company);
      }
    });
    this.userService.getProfileInfo().subscribe();
  } 
  
  refresh(){ 
    jQuery('.ui.modal.profile-modal').modal('refresh');
  }

  updateClientInfo({ value }: { value: User }) {
    this.userService.updateClientInfo(value).subscribe();
  }

  updateClientCompany({ value }: { value: Client }) {
    this.userService.updateClientCompany(value).subscribe();
  }
}