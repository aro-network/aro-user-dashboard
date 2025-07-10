export function postX({ text, url, target = "_blank" }: { text: string; url?: string; target?: "_blank" | "_self" | "_parent" | "_top" | "_unfencedTop" }) {
  let postXUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
  if (url) {
    postXUrl += `&url=${encodeURIComponent(url)}`;
  }
  window.open(postXUrl, target);
}
