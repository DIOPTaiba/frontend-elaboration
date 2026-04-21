import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajEmploisEffectifProgrammeComponent } from './maj-emplois-effectif-programme.component';

describe('MajEmploisEffectifProgrammeComponent', () => {
  let component: MajEmploisEffectifProgrammeComponent;
  let fixture: ComponentFixture<MajEmploisEffectifProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajEmploisEffectifProgrammeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajEmploisEffectifProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
