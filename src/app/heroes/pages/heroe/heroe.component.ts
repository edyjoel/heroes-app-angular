import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      .row {
        display: flex;
        justify-content: space-between;
      }

      .column {
        width: 48%;
      }

      img {
        width: 100%;
        border-radius: 5px;
        margin-top: 20px;
      }

      @media (max-width: 767px) {
        .row {
          flex-direction: column;
        }

        .column {
          width: 100%;
        }

        img {
          margin-bottom: 20px;
        }
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id)),
        tap(console.log)
      )
      .subscribe((heroe) => (this.heroe = heroe));
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
