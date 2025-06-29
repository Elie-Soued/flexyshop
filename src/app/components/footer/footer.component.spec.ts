import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Footer is correctly rendered', () => {
    const footer = fixture.debugElement.query(By.css('footer')).nativeElement;
    expect(footer).toBeTruthy();
  });

  it('Make sure year is present in the footer', () => {
    const year = fixture.debugElement.query(By.css('#year')).nativeElement;
    const currentYear = new Date().getFullYear();
    expect(year.innerText).toContain(currentYear);
  });
});
