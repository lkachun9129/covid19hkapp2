import { AfterViewInit, Directive, ElementRef } from "@angular/core";

const TRANSLATEX_REGEX = /translateX\(([-]?[0-9]+(\.[0-9]+)?)px\)/;

const CARD_WIDTH = 315;
const CARD_MARGIN = 5;
const CARD_DIFFERENCE = CARD_WIDTH + CARD_MARGIN;
const SCALE_DIFFERENCE = 0.1;

@Directive({
    selector: '.hero-container'
})
export class CarouselCellsDirective implements AfterViewInit {

    private _domChanges: MutationObserver;

    constructor(private readonly _elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        let carouselCells = this._elementRef.nativeElement.getElementsByClassName("carousel-cells")[0];
        let carouselCell: HTMLCollection = this._elementRef.nativeElement.getElementsByClassName("carousel-cell");

        this.updateScale(carouselCell, 0);

        this._domChanges = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => {
                let containerTransformString: string = (mutation.target as any).style.transform;
                let containerTransformValue = Number.parseFloat(containerTransformString.match(TRANSLATEX_REGEX)[1]);
                this.updateScale(carouselCell, containerTransformValue);
            });
        });

        this._domChanges.observe(carouselCells, {
            attributes: true
        });
    }

    private updateScale(childElements: HTMLCollection, containerTransformValue: number) {
        for (let idx = 0; idx < childElements.length; ++idx) {
            let childElement = childElements[idx] as HTMLElement;
            let childTransformValue = Number.parseFloat((childElement.style.transform as string).match(TRANSLATEX_REGEX)[1]);
            let difference = Math.min(Math.abs(childTransformValue + containerTransformValue), CARD_DIFFERENCE);
            let scale = 1 - difference / CARD_DIFFERENCE * SCALE_DIFFERENCE;
            childElement.style.transform = `translateX(${childTransformValue}px) scale(${scale})`;
        }
    }
}