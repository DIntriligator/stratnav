import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, UrlTree } from '@angular/router';
import { SnRoutes, SnRoute } from '../interfaces/routes';
import { SnRouteParams } from '../interfaces/route-params';
import { SnRouteSegments } from '../interfaces/route-segments';

export class SnNavigation<T> {
  protected relativeRoute?: ActivatedRoute;

  constructor(protected routes: SnRoutes, protected router: Router) {}

  public navigate(key: T, params: SnRouteParams = {}): void {
      const segments = this.getSegmentsFromRoute(this.getRouteByKey(key), params);
      this.navigateWithParams(segments, params);
  }

  public getUrl(key: T, params: SnRouteParams = {}): string {
      const urlTree = this.getUrlTreeFromRoute(this.getRouteByKey(key), params);
      return this.router.serializeUrl(urlTree);
  }

  public registerRelativeRoute(route: ActivatedRoute): void {
      this.relativeRoute = route;
  }

  private navigateWithParams(segments: SnRouteSegments, params: SnRouteParams): void {
      this.router.navigate(segments, this.getNavigationExtrasFromParams(params));
  }

  private getNavigationExtrasFromParams(params: SnRouteParams): NavigationExtras {
      const relativeTo = !!params.root ? undefined : this.relativeRoute;
      return { queryParams: params.queryParams, relativeTo };
  }

  private getSegmentsFromRoute(route: SnRoute, params: SnRouteParams): SnRouteSegments {
      const rootSegments = params.root || ['.'];
      return [...rootSegments, ...route.getRouteSegments(params.routeParams)];
  }

  private getUrlTreeFromRoute(route: SnRoute, params: SnRouteParams): UrlTree {
      const segments = this.getSegmentsFromRoute(route, params);
      return this.router.createUrlTree(segments, this.getNavigationExtrasFromParams(params));
  }

  private getRouteByKey(key: T): SnRoute {
      return this.routes[(key as unknown) as string];
  }
}
