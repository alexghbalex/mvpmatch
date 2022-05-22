import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {ApiService} from "../../services/api.service";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  user: Observable<string> | undefined;
  initials: string = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private api: ApiService
  ) {
    this.matIconRegistry.addSvgIcon('logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/B.svg'));
    this.matIconRegistry.addSvgIcon('menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/menu.svg'));
  }

  ngOnInit(): void {
    this.user = this.api.getUser().pipe(
      map(user => `${user.firstName} ${user.lastName}`),
      tap(user => this.initials = user.split(' ').map(n => n[0]).join(''))
    );
  }
}
