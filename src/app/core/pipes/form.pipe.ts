import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FieldError' })
export class FieldError implements PipeTransform {
  transform(value: any, before?: string, after?: string): string {
    if (value.hasError('required')) {
      return 'Ce champ est requis';
    } else if (value.hasError('email')) {
      return 'Adresse email invalide';
    }
  }
}
