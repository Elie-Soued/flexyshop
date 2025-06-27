import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartcontentComponent } from './cartcontent.component';

describe('CartcontentComponent', () => {
  let component: CartcontentComponent;
  let fixture: ComponentFixture<CartcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
