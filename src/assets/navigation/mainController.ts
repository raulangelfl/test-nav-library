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
  private innerHeight = window.innerHeight;

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
      event.preventDefault();
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
          this.moveToNextCarousel('down');
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
    const carouselCard = carouselContainer?.querySelectorAll('.focusable-element')[this.actualHorizontal];
    // TODO: CHECH FOR BLOCKEDCAROUSELS
    console.log('moveToNextFocusableElemet', this.actualHorizontal, this.actualVertical);
    console.log('carouselCard', carouselCard);
    console.log('carouselContainer', carouselContainer);
    try {
      (carouselCard as HTMLElement)?.focus();
      console.log('puso el foco en el card', carouselCard, this.actualVertical, this.actualHorizontal);
    } catch (error) {
      console.log('error', error);
    }
  }

  /**
   * If user clicks down or right we add 1 to the actualVertical
   * If user clicks up or left we substract 1 to the actualVertical
   * @param direction - down, up, right, left
   * @returns true if there is a next carousel, false if there is not a next carousel based on the movement
   */
  moveToNextCarousel = (direction: "down" | "up" | "right" | "left"): boolean => {
    const listOfCarousels = document?.querySelectorAll('.carousel-container') as unknown as HTMLCollection;
    if (direction === "down" || direction === "right") {
      try {
        (listOfCarousels[this.actualVertical + 1] as HTMLElement)?.focus();
        console.log('puso el foco al carousel', this.actualVertical + 1);
        this.actualVertical++;
        this.checkCarouselType(listOfCarousels);
        this.carouselVerticalCenter();
        return true;
      } catch (err) {
        return false;
      }
    }
    return true;
  }

  /**
   * Chech if the new focus carousel is grid or narmal and rest variables
   * @param carousel - the carousel to check
   */
  checkCarouselType = (listOfCarousels: HTMLCollection): void => {
    this.actualHorizontal = 0;
    this.actualGridRow = 0;
    this.actualGridcell = 0;
    if (listOfCarousels[this.actualVertical].querySelectorAll('.carousel-container-row')?.length > 0) {
      // Reset variables for grid carousel
      this.isInGridCarousel = true;
      this.isInNormalCarousel = false;
      // Focus the element based on row and cell
      (listOfCarousels[this.actualVertical]
        .querySelectorAll('.carousel-container-row')
        [this.actualGridRow].querySelectorAll('.focusable-element')
        [this.actualGridcell] as HTMLElement).focus();
    } else { // Reset variables for normal carousel
      // Reset variables for normal carousel
      this.isInNormalCarousel = true;
      this.isInGridCarousel = false;
      // Focus the current carousel
      this.moveToNextFocusableElemet();
    }
  }

  /**
   * Center the next carousel in viewport
   */
  carouselVerticalCenter = (): void => {
    const carousel = document?.querySelectorAll('.carousel-container');
    const actualCaroussel = carousel[this.actualVertical] as HTMLElement;
    let y =
      actualCaroussel.offsetTop - this.innerHeight / 2 + actualCaroussel.getBoundingClientRect().height / 2;
    y = Math.round(y);
    actualCaroussel.focus();
    if (y < 100 || this.actualVertical === 0 || (this.isInGridCarousel && this.actualGridcell === 0)) {
      document.getElementsByTagName('body')[0].scrollTop = 0;
    } else {
      document.getElementsByTagName('body')[0].scrollTop = y;
    }
  }
}