import { useCopyToClipboard } from "react-use";
import { toast } from "react-toastify";

export function useCopy() {
  const [, copy] = useCopyToClipboard();
  return (value: string) => {
    copy(value);
    toast.success("Copied !");
  };
}
