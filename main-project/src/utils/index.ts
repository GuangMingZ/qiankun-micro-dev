export const sleep = (delay: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
