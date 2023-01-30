import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .d-flex {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .column {
        width: 48%;
      }

      .w-100 {
        width: 100%;
      }

      img {
        max-width: 100%;
      }

      .mb-button {
        margin-bottom: 1rem;
      }

      @media (max-width: 768px) {
        .column {
          width: 100%;
        }

        .d-flex {
          flex-direction: column;
        }

        .center {
          text-align: center;
        }

        .mb {
          margin-bottom: 2rem;
        }
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe((heroe) => {
        this.mostrarSnackBar('Registro actualizado');
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado');
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500,
    });
  }
}
