import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { RestService } from "../../api/rest.service";
import { ListaCabeceraI } from "../cocina/listacabecera.interface";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/caja", title: "Pedido Entrante", icon: "house", class: "" },
  { path: "/estado-pedido", title: "Pedidos", icon: "list", class: "" },
];

@Component({
  selector: "app-caja",
  templateUrl: "./caja.component.html",
  styleUrls: ["./caja.component.css"],
})
export class CajaComponent implements OnInit {

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  menuItems: any[];

  pedidos:ListaCabeceraI[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ["id_cabecera","id_usuario","id_tipo_pedido","estado","lugar_entrega","borrar"];
  dataSource;

  constructor(private rest:RestService, private router:Router) {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.dataSource = new MatTableDataSource<ListaCabeceraI>(this.pedidos);
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllPedidos();
  }

  public getAllPedidos(){
    let respo=this.rest.getCabecera();
    respo.subscribe(Data=>{
      this.dataSource.data=Data as ListaCabeceraI[];
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarEstado(id){
    this.router.navigate(['editar-caja',id]);
  }
}
