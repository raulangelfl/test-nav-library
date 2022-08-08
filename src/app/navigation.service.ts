import { Injectable } from '@angular/core';
import { MainController } from '../assets/navigation/mainController';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  navigationController = new MainController;

  constructor() {}

  init() {
    this.navigationController.init();
  }

  setActualHorizontal(value: number) {
    this.navigationController.ActualHorizontal = value;
  }

  getActualHorizontal(): number {
    return this.navigationController.ActualHorizontal;
  }

  focusElement(): void {
    this.navigationController.moveToNextFocusableElemet();
  }
}
