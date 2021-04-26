import { Injectable } from '@angular/core';
import {ServiceFirebase} from '../core/iservicefirebase.service';
import {Movimentacao} from '../models/movimentacao.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService extends ServiceFirebase<Movimentacao> {

  constructor(firestore: AngularFirestore) {
    super(Movimentacao, firestore, 'movimentacoes');
  }
}
