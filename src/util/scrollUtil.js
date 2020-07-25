export const getDocumentScrollHeight = () =>
  Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

export const getDocumentClientHeight = () =>
  document.documentElement.clientHeight;

export const getDocumentScrollTop = () =>
  Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  );

export const getDistToBottom = () => {
  const scrollHeight = getDocumentScrollHeight();
  const height = getDocumentClientHeight();
  const scrollTop = getDocumentScrollTop();
  return scrollHeight - scrollTop - height;
}