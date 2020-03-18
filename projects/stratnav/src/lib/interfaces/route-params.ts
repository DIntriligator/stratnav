import { SnRouteSegments } from './route-segments';
import { Params } from '@angular/router';

export interface SnRouteParams {
    queryParams?: Params;
    routeParams?: Params;
    root?: SnRouteSegments;
}
