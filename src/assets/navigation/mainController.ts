export class MainController{
  private actualHorizontal: number = 0;
  private actualVertical: number = 0;
  private isInNormalCarousel: boolean = true;
  private isInGridCarousel: boolean = false;
  private actualGridRow: number = 0;
  private actualGridcell: number = 0;
  private childrenBetweenLeft: boolean = false;
  private childrenBetweenRight: boolean = false; 
  private childrenBetweenUp: boolean = false;
  private childrenBetweenDown: boolean = false;
  private backBtn: Array<number> = [81];

  set ActualHorizontal(value: number) {
    this.actualHorizontal = value;
  }

  get ActualHorizontal(): number {
    return this.actualHorizontal;
  }
  
  set ActualVertical(value: number) {
    this.actualVertical = value;
  }

  get ActualVertical(): number {
    return this.actualVertical;
  }  

  /**
   * @description init funcion to initialize the controller
   */
  init(): void {
    console.log('MainController init');
    document.addEventListener('keydown', (event) => {
      console.log(event.keyCode);
      const key = event.keyCode;
      if (key === 37) { // LEFT ARROW
        if (this.isInNormalCarousel) {
            console.log('left in normal carousel');
            this.moveToNextFocusableElemet();
        }
      } else if (key === 38) { // UP ARROW
        if (this.isInNormalCarousel) {
          console.log('up in normal carousel');
        }
      } else if (key === 39) { // RIGHT ARROW
        if (this.isInNormalCarousel) {
          console.log('right in normal carousel');
          this.moveToNextFocusableElemet();
        }
      } else if (key === 40) { // DOWN ARROW
        if (this.isInNormalCarousel) {
          console.log('down in normal carousel');
        }
      } else if (key === 13) { // ENTER
        console.log('enter');
        // return user view to the top of the document
        document.getElementsByTagName('body')[0].scrollTop = 0;
        // stop propagation on button elements
        if (document.activeElement?.tagName !== 'BUTTON') {
          (document.activeElement as HTMLElement)?.click();
        }
      } else if (key in this.backBtn) { // BACKBTN
        console.log('backbtn');
      }
    });
  }

  /**
   * Focus the next focusable element base on the actualHorizontal y actualVertical
   */
  moveToNextFocusableElemet = ():void => {
    const carouselContainer = document?.querySelectorAll('.carousel-container')[this.actualVertical]
    console.log('carouselContainer: ', carouselContainer);
    const carouselCard = carouselContainer?.querySelectorAll('.focusable-element')[this.actualHorizontal];
    console.log('carouselCard: ', carouselCard);
    // TODO: CHECH FOR BLOCKEDCAROUSELS
    (carouselCard as HTMLElement)?.focus();
  }
}