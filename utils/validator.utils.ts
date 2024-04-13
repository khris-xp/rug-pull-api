import { handleError } from './error.utils';

export function RequestValidator(descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const [req, res] = args;
    const { error } = req.body;
    if (error) {
      return handleError(400, res, error);
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}
