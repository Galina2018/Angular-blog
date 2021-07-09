import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000

  public text: string
  public type = 'success'

  aSub: Subscription

  constructor(private AlertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.AlertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
