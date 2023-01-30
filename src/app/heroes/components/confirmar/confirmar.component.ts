import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
    `
      .dialog {
        padding: 1rem;
        text-align: center;
      }

      button {
        margin: 0 0.5rem;
      }
    `,
  ],
})
export class ConfirmarComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) {}

  ngOnInit(): void {}

  confirmar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
