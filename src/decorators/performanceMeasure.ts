const measure = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`📌 Execution time: ${finish - start} milliseconds, ${this}`);
    return result;
  };

  return descriptor;
};

export default measure;
