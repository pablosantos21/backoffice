import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to logIn page', () => {
    component.toLogIn();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to signUp page', () => {
    component.toSignUp();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should navigate to home page', () => {
    component.toHomePage();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['homePage']);
  });

  it('should navigate to loggedUser homePage', () => {
    component.admin = false;
    component.logged = true;
    component.toHomePage();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['loggedHomePage']);
  });

  it('should navigate to admin homePage', () => {
    component.admin = true;
    component.logged = true;
    component.toHomePage();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['adminHomePage']);
  });
});
