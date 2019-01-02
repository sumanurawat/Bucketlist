import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router, RouterModule, Routes, NavigationEnd } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../filter.pipe';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterPipe]
})
export class HomeComponent implements OnInit {

  searchText: any;
  items: AngularFireList<any>;
  inditems: AngularFireList<any>;
  checkIndItems: AngularFireList<any>;
  tasks: Observable<any>
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {
    this.items = af.list('/messages', ref => ref.orderByChild('likes'));
    this.tasks = this.items.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  ngOnInit() {
    $("a.js-scroll-trigger[href^='#']").click(function(e) {
      e.preventDefault();
      var position = $($(this).attr("href")).offset().top;
      $("body, html").animate({
        scrollTop: position
      } /* speed */);
    });
  }

}
