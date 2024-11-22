import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  clientes: Persona[] = []
  clienteTemp: Persona = new Persona('', '', '', '', '', '', '')
  clienteSeleccionado = false

  editarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required]),
    numberPhone: new FormControl('', [Validators.required]),
    addres: new FormControl('', [Validators.required]),
    codeZip: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this.cargarClientes()
  }
  constructor(private clienteS: UsuariosServiceService, private contratoS: AdministradoresServiceService) { }

  cargarClientes() {
    this.clientes = this.clienteS.cargarUsuario()
  }


  seleccionarCliente(email: string) {
    this.clienteSeleccionado = true
    const cliente = this.clientes.find(cli => cli.email === email);
    if (cliente) {
      this.clienteTemp = cliente
      this.editarForm = new FormGroup({
        name: new FormControl(this.clienteTemp.nombre || '', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl(this.clienteTemp.apellido || '', [Validators.required]),
        numberPhone: new FormControl(this.clienteTemp.numeroTelefonico || '', [Validators.required]),
        addres: new FormControl(this.clienteTemp.direccion || '', [Validators.required]),
        codeZip: new FormControl(this.clienteTemp.codigo || '', [Validators.required]),
      })
    }
  }

  actualizarCliente() {
    console.log(this.editarForm.get('name')?.value || ' ',)
    if (this.editarForm.valid) {
      const nuevosDatos: Persona = new Persona(
        this.clienteTemp.email,
        '',
        this.editarForm.get('name')?.value || ' ',
        this.editarForm.get('lastName')?.value || ' ',
        this.editarForm.get('numberPhone')?.value || ' ',
        this.editarForm.get('addres')?.value || ' ',
        this.editarForm.get('codeZip')?.value || ' ',
        this.clienteTemp.rolAdministrativo
      );
      if (!this.editarForm.pristine) {
        console.log("diferentes")
        const actualizado = this.clienteS.actualizarUsuario(this.clienteTemp.email, nuevosDatos);
        this.contratoS.actualizarContratosCliente(this.clienteTemp.email, nuevosDatos)
        this.cargarClientes()
        if (actualizado) {
          console.log('Cliente actualizado correctamente');
          this.cargarClientes();
          this.alertConfirm('Se actualizo correctamente')
        } else {
          this.alertError('Error: Cliente no encontrado')
        }
      }
      this.editarrF();
    } else {
      this.alertError('Complete los campos')
    }
  }
  editarF = false
  editarrF() {
    this.editarF = !this.editarF
  }

  menuVisibleIndex: number | null = null;

  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    this.showDangerAlert = true;
    this.textError = error
    setTimeout(() => {
      this.textError = ''
      this.showDangerAlert = false;
    },5000);
  }


  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    this.showConfirmAlert = true;
    this.textConfirm = error
    setTimeout(() => {
      this.textConfirm = ''
      this.showConfirmAlert = false;
    },5000);
  }
}
