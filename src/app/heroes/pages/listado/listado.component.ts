import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      .grid-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .grid-item {
        width: 24%;
        margin-bottom: 2%;
      }

      @media (max-width: 991px) {
        .grid-item {
          width: 31.33%;
        }
      }

      @media (max-width: 767px) {
        .grid-item {
          width: 49%;
        }
      }

      @media (max-width: 575px) {
        .grid-item {
          width: 100%;
          margin-bottom: 20px;
        }
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}

  heroes: Heroe[] = [];

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
