import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from '@components/board-list/board-list.component';

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
