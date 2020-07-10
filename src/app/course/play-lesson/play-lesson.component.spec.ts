import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayLessonComponent } from './play-lesson.component';

describe('PlayLessonComponent', () => {
  let component: PlayLessonComponent;
  let fixture: ComponentFixture<PlayLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayLessonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
