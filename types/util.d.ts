interface SuccessResult<T> {
  success: true;
  data: T;
}

interface ErrorResult {
  success: false;
  error: string;
}

type Result<T = any> = SuccessResult<T> | ErrorResult;

export type { Result };
