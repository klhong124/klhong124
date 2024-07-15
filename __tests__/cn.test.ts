import { sm, md, lg, xl, _2xl, dark, generateClass } from '@/utils/cn';

describe('Utility class generator functions', () => {
  test('sm function should prepend "sm:" to class names', () => {
    expect(sm('col-span-2', 'order-1')).toBe('sm:col-span-2 sm:order-1');
  });

  test('md function should prepend "md:" to class names', () => {
    expect(md('col-span-2', 'order-1')).toBe('md:col-span-2 md:order-1');
  });

  test('lg function should prepend "lg:" to class names', () => {
    expect(lg('col-span-2', 'order-1')).toBe('lg:col-span-2 lg:order-1');
  });

  test('xl function should prepend "xl:" to class names', () => {
    expect(xl('col-span-2', 'order-1')).toBe('xl:col-span-2 xl:order-1');
  });

  test('_2xl function should prepend "2xl:" to class names', () => {
    expect(_2xl('col-span-2', 'order-1')).toBe('2xl:col-span-2 2xl:order-1');
  });

  test('dark function should prepend "dark:" to class names', () => {
    expect(dark('col-span-2', 'order-1')).toBe('dark:col-span-2 dark:order-1');
  });

  describe('generateClass function', () => {
    test('should prepend the given prefix to class names', () => {
      expect(generateClass('test', 'col-span-2', 'order-1')).toBe('test:col-span-2 test:order-1');
    });

    test('should ignore empty strings', () => {
      expect(generateClass('test', 'col-span-2', '', 'order-1')).toBe('test:col-span-2 test:order-1');
    });

    test('should handle multiple inputs with spaces', () => {
      expect(generateClass('test', 'col-span-2 order-1', 'm-4')).toBe('test:col-span-2 test:order-1 test:m-4');
    });
  });
});