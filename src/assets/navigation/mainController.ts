export class MainController{
  actualHorizontal: number = 0;
  actualVertical: number = 0;
  isInNormalCarousel: boolean = true;
  isInGridCarousel: boolean = false;
  actualGridRow: number = 0;
  actualGridcell: number = 0;
  childrenBetweenLeft: boolean = false;
  childrenBetweenRight: boolean = false; 
  childrenBetweenUp: boolean = false;
  childrenBetweenDown: boolean = false;
  backBtn: Array<number> = [81];

  /**
   * @description init funcion to initialize the controller
   */
  init(): void {
    console.log('MainController init');
    document.addEventListener('keydown', (event) => {
      console.log(event.keyCode);
    });
  }
  
}