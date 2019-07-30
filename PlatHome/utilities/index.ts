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
