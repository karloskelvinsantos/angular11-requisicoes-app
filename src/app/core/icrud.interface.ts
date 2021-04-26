import { Observable } from 'rxjs';

export interface ICrud<T> {
  get(id: string): Observable<T>;
  list(): Observable<T[]>;

  createOrUpdate(item: T): Promise<void | T>;
  delete(id: string): Promise<void>;
}
