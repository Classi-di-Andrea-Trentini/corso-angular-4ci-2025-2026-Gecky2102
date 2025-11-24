import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassiInterfacce } from './classi-interfacce';

describe('ClassiInterfacce', () => {
  let component: ClassiInterfacce;
  let fixture: ComponentFixture<ClassiInterfacce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassiInterfacce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassiInterfacce);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have docente data initialized', () => {
    expect(component.docente()).toBeDefined();
    expect(component.docente()?.nome).toBe('Andrea');
    expect(component.docente()?.cognome).toBe('Trentini');
  });

  it('should display docente name and surname in the template', () => {
    const compiled = fixture.nativeElement;
    const docenteSection = compiled.textContent;
    
    expect(docenteSection).toContain('Andrea');
    expect(docenteSection).toContain('Trentini');
  });

  it('should display docente materie in the template', () => {
    const compiled = fixture.nativeElement;
    const docenteSection = compiled.textContent;
    
    expect(docenteSection).toContain('Informatica');
    expect(docenteSection).toContain('TPSIT');
    expect(docenteSection).toContain('Autonomia');
  });

  it('should display docente classi in the template', () => {
    const compiled = fixture.nativeElement;
    const docenteSection = compiled.textContent;
    
    expect(docenteSection).toContain('3Bi');
    expect(docenteSection).toContain('4CI');
    expect(docenteSection).toContain('4Bi');
    expect(docenteSection).toContain('5Ai');
  });
});
