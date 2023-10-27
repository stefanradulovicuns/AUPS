import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectOfLabor } from 'src/app/models/objectOfLabor';
import { Warehouse } from 'src/app/models/warehouse';
import { ObjectOfLaborService } from 'src/app/services/object-of-labor.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-object-of-labor-info',
  templateUrl: './object-of-labor-info.component.html',
  styleUrls: ['./object-of-labor-info.component.css']
})
export class ObjectOfLaborInfoComponent implements OnInit {

  objectOfLabor: ObjectOfLabor | null = null;
  warehouse: Warehouse | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private objectOfLaborService: ObjectOfLaborService) { }

  ngOnInit(): void {
    this.getObjectOfLabor();
  }

  getObjectOfLabor() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.objectOfLaborService.getObjectOfLaborById(id).subscribe({
      next: (data) => {
        this.objectOfLabor = data;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => {

      }
    });
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
