import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  clientes: Persona[] = []
  clienteTemp: Persona = new Persona(0, '', '', '', '', '', '','')
  clienteSeleccionado = false

  editarForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required]),
    numberPhone: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
    addres: new FormControl('', [Validators.required]),
    codeZip: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
  })

  editarFormR = new FormGroup({
    rol: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    this.cargarClientes()
  }
  constructor(private clienteS: UsuariosServiceService, private contratoS: ContratoService) { }

  cargarClientes(): void {
    this.clienteS.getPersonas().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => this.alertError('Error al cargar clientes.')
    );
  }


  seleccionarCliente(id: number): void {
    this.clienteSeleccionado = true;
    this.clienteS.getPersonaById(id).subscribe(
      (cliente) => {
        if (cliente) {
          this.clienteTemp = cliente;
          this.editarForm.setValue({
            name: cliente.nombre || '',
            lastName: cliente.apellido || '',
            numberPhone: cliente.telefono || '',
            addres: cliente.direccion || '',
            codeZip: cliente.cedula || ''
          });
        }
      },
      (error) => this.alertError('Error al obtener el cliente.')
    );
  }

  seleccionarClienteRol(id: number): void {
    this.clienteSeleccionado = true;
    this.clienteS.getPersonaById(id).subscribe(
      (cliente) => {
        if (cliente) {
          this.clienteTemp = cliente;
          this.editarFormR.setValue({
            rol: cliente.rol.toString()
          });
        }
      },
      (error) => this.alertError('Error al obtener el cliente.')
    );
  }


  actualizarCliente(): void {
    if (this.editarForm.valid && this.clienteTemp) {
      const personaActualizada = new Persona(
        this.clienteTemp.id,
        this.clienteTemp.email,
        this.clienteTemp.password,
        this.editarForm.get('name')?.value || '',
        this.editarForm.get('lastName')?.value || '',
        this.editarForm.get('numberPhone')?.value || '',
        this.editarForm.get('addres')?.value || '',
        this.editarForm.get('codeZip')?.value || '',
        this.clienteTemp.rol,
        this.clienteTemp.listaContratos
      );

      this.clienteS.updatePersona(personaActualizada).subscribe(
        () => {
          this.cargarClientes();
          this.alertConfirm('Cliente actualizado correctamente.');
          this.editarrF();
        },
        (error) => this.alertError('Error al actualizar el cliente.')
      );
    } else {
      this.alertError('Complete los campos correctamente.');
    }
  }
  editarR = false
  editarrR() {
    this.editarR = !this.editarR
  }
  actualizarRol(): void {
    if (this.editarFormR.valid && this.clienteTemp) {
      const rolA = this.editarFormR.get('rol')?.value;
      const rolBooleano = rolA === 'true';

      this.clienteTemp.rol = rolBooleano;

      this.clienteS.updatePersona(this.clienteTemp).subscribe(
        () => {
          this.alertConfirm('Rol actualizado correctamente.');
          this.cargarClientes();
          this.editarrR();
        },
        (error) => this.alertError('Error al actualizar el rol del cliente.')
      );
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
    }, 5000);
  }


  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    this.showConfirmAlert = true;
    this.textConfirm = error
    setTimeout(() => {
      this.textConfirm = ''
      this.showConfirmAlert = false;
    }, 5000);
  }
}
