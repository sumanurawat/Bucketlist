import { Component, OnInit, HostBinding } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import "rxjs/add/observable/of";
import { of as observableOf } from 'rxjs/observable/of';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public chart: AmChart;
  public tempChart: any;
  public selected: any[] = new Array();
  public result: any;

  constructor(private AmCharts: AmChartsService, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public af: AngularFireAuth, private router: Router, private formBuilder: FormBuilder) {

  }

  Add() {
    this.selected = new Array();
    if(this.tempChart == undefined)
    {
      this.router.navigateByUrl('/personal');
      return;
    }
    for (var i = 0; i < this.tempChart.dataProvider.areas.length; i++) {
      if (this.tempChart.dataProvider.areas[i].showAsSelected)
        this.selected.push(this.tempChart.dataProvider.areas[i].id);
    }
    var user = firebase.auth().currentUser;
    this.afd.object(`users/${user.uid}`).update({ countries: this.selected });
    this.router.navigateByUrl('/personal');
  }

  ngOnInit() {
    let that = this;
    var user = firebase.auth().currentUser;
    let objectSubscription = that.afd.object(`users/${user.uid}`).valueChanges().subscribe(res => {
      that.result = res;
      that.selected = that.result.countries;
      if (that.selected == undefined)
        that.selected = new Array();
      objectSubscription.unsubscribe();

      this.chart = this.AmCharts.makeChart("chartdiv", {
        "type": "map",
        "hideCredits": true,
        "path": "/libs/amcharts/",
        "theme": "light",
        "projection": "eckert3",
        "dragMap": false,
        "dataProvider": {
          "map": "worldLow",
          "getAreasFromMap": true,
          "areas": [
          ]
        },
        "areasSettings": {
          "selectedColor": "#000000",
          "rollOverColor": "#000000",
          "selectable": true,
        },
        "zoomControl": {
          "homeButtonEnabled": false,
          "zoomControlEnabled": false,
          "panControlEnabled": false,
        },
        /**
         * Add click event to track country selection/unselection
         */
        "listeners": [{
          "event": "init",
          "method": function(e) {
            var chart = e.chart;
            if (that.selected == undefined)
              return;
            for (var i = 0; i < that.selected.length; i++) {
              var area = chart.getObjectById(that.selected[i]);
              area.showAsSelected = true;
              chart.returnInitialColor(area);
            }
          }
        },
        {
          "event": "clickMapObject",
          "method": function(e) {
            // Ignore any click not on area
            that.tempChart = e.chart;
            if (e.mapObject.objectType !== "MapArea")
              return;
            var area = e.mapObject;
            // Toggle showAsSelected
            area.showAsSelected = !area.showAsSelected;
            e.chart.returnInitialColor(area);
          }
        }]
      });
    });
  }
}
