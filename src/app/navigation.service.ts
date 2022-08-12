import { Injectable } from '@angular/core';
// import { MainController } from '../assets/navigation/mainController';
import { createNavigationService, NavigationService as NService } from 'fl-navigation';
import { NavigationConfig } from 'fl-navigation/dist/model/config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  // navigationController = new MainController;

  // constructor() {}

  // init() {
  //   this.navigationController.init();
  // }

  // setActualHorizontal(value: number) {
  //   this.navigationController.ActualHorizontal = value;
  // }

  // getActualHorizontal(): number {
  //   return this.navigationController.ActualHorizontal;
  // }

  // setActualVertical(value: number) {
  //   this.navigationController.ActualVertical = value;
  // }

  // getActualVertical(): number {
  //   return this.navigationController.ActualVertical;
  // }

  // focusElement(): void {
  //   this.navigationController.moveToNextFocusableElemet();
  // }
  navigationService: NService;
  config: NavigationConfig = {
    enabledebugLogs: true,
    horizontalContainerName: 'carousel-container',
    focusableElementName: 'focusable-element',
    verticalContainerName: 'empty-container',
    infinityContainerName: 'infinity-container',
    gridRowName: 'empty-row',
  };
  constructor() {
    this.navigationService = createNavigationService(this.config, document);
  }
  init(): void {
    this.navigationService.init();
  }
  focusFirstElement(): void {
    this.navigationService.focusFirstElement();
  }
}
