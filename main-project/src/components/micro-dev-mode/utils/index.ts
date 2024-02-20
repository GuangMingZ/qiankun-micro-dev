// 判断是否触发组合键
export const handleKeyCode = (keyCode = '') => (event: KeyboardEvent): boolean => event.altKey && event.shiftKey && event.code === keyCode;

export const isUrlLike = (input: string): boolean => {
  const re = /^http(s)?:\/\/(\w+(\.)?)*(:)?(\d+)?/;
  return re.test(input);
};

export default { handleKeyCode, isUrlLike };
