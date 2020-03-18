import { Input, HostBinding } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Params } from '@angular/router';
import { SnRouteParams } from '../interfaces/route-params';
import { SnNavigation } from '../navigation/navigation';

export class SnLink<T> {
  @Input() queryParams!: Params;

  @Input() routeParams!: Params;

  @Input() set key(key: T) {
      this.setHREFFromKey(key);
  }

  @HostBinding() href!: string;

  private get params(): SnRouteParams {
      return {
          queryParams: this.queryParams,
          routeParams: this.routeParams
      };
  }

  constructor(
      protected navigation: SnNavigation<T>,
      protected locationStrategy: LocationStrategy
  ) {}

  public setHREFFromKey(type: T): void {
      this.updateHref(this.navigation.getUrl(type, this.params));
  }

  private updateHref(url: string): void {
      this.href = this.locationStrategy.prepareExternalUrl(url);
  }

}
