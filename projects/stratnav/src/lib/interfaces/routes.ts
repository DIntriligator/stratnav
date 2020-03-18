import { SnRouteSegments } from './route-segments';
import { Params } from '@angular/router';

export interface SnRoute {
    getRouteSegments(routeParams?: Params): SnRouteSegments;
}

export type SnRoutes = { [key: string]: SnRoute };
