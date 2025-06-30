import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarsComponent } from './stars.component';

describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    component.product = {
      rating: 4,
      comment: '',
      date: '',
      reviewerEmail: '',
      reviewerName: '',
    };
    fixture.detectChanges();
  });

  it('Make sure the correct number of stars is rendered', () => {
    component.product = {
      rating: 2,
      comment: '',
      date: '',
      reviewerEmail: '',
      reviewerName: '',
    };

    fixture.detectChanges();

    const goldenStars =
      fixture.nativeElement.querySelectorAll('.goldenStar').length;
    const regularStars =
      fixture.nativeElement.querySelectorAll('.regularStar').length;

    expect(regularStars).toBe(3);
    expect(goldenStars).toBe(2);
  });
});
