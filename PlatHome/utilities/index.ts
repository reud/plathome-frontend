// a function for mock and tests
export function Sleep(time: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
export function MapToEnum<T>(
  enumObject: T,
  value: any
): T[keyof T] | undefined {
  if (typeof enumObject === 'object') {
    for (const key in enumObject) {
      // @ts-ignore
      if (enumObject.hasOwnProperty(key) && enumObject[key] === value) {
        return enumObject[key];
      }
    }
  } else if (Array.isArray(enumObject)) {
    return enumObject.find(value);
  }
  /* 3.0.x
  } else if ((enumObject as any) instanceof Array) {
    return (enumObject as any[]).find(value)
  }
  */
}

export function GetValueArrayFromEnum<T>(enumObject: T): string[] {
  const result: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(enumObject).forEach(([_, value]) => {
    result.push(value);
  });
  return result;
}

export const deepCopy = <T>(target: T): T => {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  if (Array.isArray(target)) {
    const cp = [] as any[];
    (target as any[]).forEach((v) => {
      cp.push(v);
    });
    return cp.map((n: any) => deepCopy<any>(n)) as any;
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) } as {
      [key: string]: any;
    };
    Object.keys(cp).forEach((k) => {
      cp[k] = deepCopy<any>(cp[k]);
    });
    return cp as T;
  }
  return target;
};
